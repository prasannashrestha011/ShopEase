package com.app.backend.Controllers;

import java.util.List;
import java.util.Map;
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
import com.app.backend.Responses.ApiResponse;
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

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createNewProduct(
            @RequestPart("productEntities") List<ProductEntity> productEntities,
            @RequestParam MultiValueMap<String, MultipartFile> productImages,
            @RequestParam(value = "seller_id") String sellerId) {

        for (ProductEntity productEntity : productEntities) {
            logger.info("Received product entity: Name = {}, Price = {}, Retailer = {}",
                    productEntity.getProductName(),
                    productEntity.getProductPrice(),
                    productEntity.getSellerId());
        }
        for (Map.Entry<String, List<MultipartFile>> file : productImages.entrySet()) {
            var fileList = file.getValue();
            for (var fileInfo : fileList) {
                if (!"blob".equals(fileInfo.getOriginalFilename())) {
                    logger.info("file->name {}", fileInfo.getOriginalFilename());
                    logger.info("file content type->{}", fileInfo.getContentType());
                    logger.info("file size ->{}", fileInfo.getSize());
                }
            }
        }

        if (productEntities != null && productImages != null) {

            String response = null;
            for (int i = 0; i < productEntities.size(); i++) {
                {
                    ProductEntity product = productEntities.get(i);

                    response = productService.createProduct(product, productImages, sellerId);

                }

            }
            ApiResponse apiResponse = new ApiResponse(response);
            return ResponseEntity.ok().body(apiResponse);
        }
        ApiResponse apiResponse = new ApiResponse("invalid product info!!");
        return ResponseEntity.badRequest().body(apiResponse);
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
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("image") MultipartFile image) {
        if (image != null) {
            Map<String, Object> response = cloudinaryImageService.uploadImage(image);
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
