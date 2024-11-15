package com.app.backend.Service.Products.ProductService;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.web.multipart.MultipartFile;

import com.app.backend.Entities.ProductEntity;

public interface ProductService {
    ProductEntity getProductById(String product_id);

    List<ProductEntity> getProductByName(String product_name);

    CompletableFuture<String> createProduct(ProductEntity productEntity, List<MultipartFile> file, String sellerId);

    List<ProductEntity> getAllProducts();

    String deleteAllProductList();

}
