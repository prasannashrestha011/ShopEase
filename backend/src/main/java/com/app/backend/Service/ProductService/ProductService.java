package com.app.backend.Service.ProductService;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.backend.Entities.ProductEntity;

public interface ProductService {
    ProductEntity getProductById(String product_id);

    ProductEntity getProductByName(String product_name);

    String createProduct(ProductEntity productEntity, MultipartFile file, String sellerId);

    List<ProductEntity> getAllProducts();
}
