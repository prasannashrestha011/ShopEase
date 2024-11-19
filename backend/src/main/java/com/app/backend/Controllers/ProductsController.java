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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.backend.Entities.ProductEntity;
import com.app.backend.Entities.ProductQueries.ProductQueryEntity;
import com.app.backend.Entities.ProductQueries.ProductRatingEntity;
import com.app.backend.Entities.ProductQueries.QueryReplyEntity;
import com.app.backend.Service.CloudinaryService.CloudinaryImageServiceImpl;
import com.app.backend.Service.Products.ProductQueriesService.ProductQuery.ProductQueryServiceImpl;
import com.app.backend.Service.Products.ProductRatingServices.ProductRatingServiceImpl;
import com.app.backend.Service.Products.ProductService.ProductServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/product")
public class ProductsController {

    @Autowired
    ProductServiceImpl productService;

    @Autowired
    ProductQueryServiceImpl productQueryService;

    @Autowired
    ProductRatingServiceImpl productRatingService;

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

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller")
    public ResponseEntity<Object> getProductBySellerId(@RequestParam(value = "sellerId") String sellerId) {
        try {
            var productList = productService.getProductsBySellerId(sellerId);
            if (productList.isEmpty())
                throw new Exception("product list is empty");
            return ResponseEntity.ok().body(productList);
        } catch (Exception e) {
            logger.error("error: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
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

    @GetMapping("/get/queries")
    public ResponseEntity<Object> getProductQuery(
            @RequestParam(name = "productId", required = false) String productId,
            @RequestParam(name = "sellerId", required = false) String sellerId) {
        try {

            var queryList = StringUtils.hasText(sellerId) ? productQueryService.getQueriesBySellerId(sellerId)
                    : productQueryService.getProductQueriesById(productId);

            if (queryList.isEmpty())
                throw new Exception("no queries founds");
            return ResponseEntity.ok().body(queryList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/insert/query")
    public ResponseEntity<Object> InsertProductQuery(@RequestBody ProductQueryEntity productQueryEntity) {
        try {

            if (productQueryEntity == null)
                throw new Exception("Invalid query input");
            logger.info("product Desc-> {}", productQueryEntity.getQuestionDesc());
            var response = productQueryService.InsertProductQuery(productQueryEntity);
            return ResponseEntity.ok().body(Map.of("sucess", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/insert/query/reply")
    public ResponseEntity<Object> InsertQueryReply(@RequestBody QueryReplyEntity queryReplyEntity) {
        try {
            var response = productQueryService.InsertQueryReply(queryReplyEntity);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get/ratings")
    public ResponseEntity<Object> GetProductRatings(@RequestParam(name = "productId") String productId) {
        try {
            var ratingList = productRatingService.GetProductRatings(productId);
            return ResponseEntity.ok().body(ratingList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body(Map.of("error", "rating not found!!"));
        }
    }

    @PostMapping("/insert/rating")
    public ResponseEntity<Object> InsertProductRating(@RequestBody ProductRatingEntity productRatingEntity) {
        try {

            var message = productRatingService.InsertProductRating(productRatingEntity);
            return ResponseEntity.ok().body(Map.of("success", message));
        } catch (Exception e) {
            logger.info("error:{}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of("error", "failed to insert the rating"));
        }
    }
}
