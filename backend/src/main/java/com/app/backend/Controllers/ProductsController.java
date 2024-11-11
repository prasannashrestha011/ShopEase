package com.app.backend.Controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.backend.Entities.ProductEntity;

import com.app.backend.Service.CloudinaryService.CloudinaryImageServiceImpl;
import com.app.backend.Service.ProductService.ProductServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/product")
public class ProductsController {

    @Autowired
    ProductServiceImpl productService;

    @Autowired
    CloudinaryImageServiceImpl cloudinaryImageService;
    private static final Logger logger = LoggerFactory.getLogger(ProductsController.class);

    @GetMapping
    public ResponseEntity<ProductEntity> getProductById(@RequestParam(value = "id") String id) {
        var targetedProduct = productService.getProductById(id);
        if (targetedProduct != null) {
            return ResponseEntity.ok().body(targetedProduct);
        }
        return ResponseEntity.internalServerError().body(null);
    }

    @GetMapping("/name")
    public ResponseEntity<Object> getProductByName(@RequestParam(value = "productName") String productName) {
        try {
            var productList = productService.getProductByName(productName);
            if (productList.isEmpty())
                throw new Exception("Product not found!!");
            return ResponseEntity.ok().body(productList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createNewProduct(
            @RequestPart("productEntities") List<ProductEntity> productEntities,
            @RequestParam MultiValueMap<String, MultipartFile> productImages,
            @RequestParam(value = "seller_id") String sellerId) {
        int count = 0;
        CompletableFuture<String> response = null;
        for (ProductEntity productEntity : productEntities) {

            logger.info("Received product entity: Name = {} {}",
                    productEntity.getProductName(), productEntity.getProductCategory());
            var key = String.format("productImages[%d]", count);
            var files = productImages.get(key);

            for (var file : files) {
                logger.info("product Image file name {}", file.getOriginalFilename());
            }
            response = productService.createProduct(productEntity, files, sellerId);
            count++;

        }

        return ResponseEntity.ok().body(Map.of("message", response));

    }

    @GetMapping("/list")
    public ResponseEntity<List<ProductEntity>> getProductsList() {
        var productList = productService.getAllProducts();
        if (productList != null) {
            return ResponseEntity.ok().body(productList);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PostMapping("/upload/image")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("image") MultipartFile image)
            throws IOException {
        if (image != null) {
            Map<String, Object> response = cloudinaryImageService.uploadImage(image.getBytes());
            return ResponseEntity.ok().body(response);
        }
        return ResponseEntity.internalServerError().body(null);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProductList() {
        var response = productService.deleteAllProductList();
        return ResponseEntity.ok().body(response);
    }
}
