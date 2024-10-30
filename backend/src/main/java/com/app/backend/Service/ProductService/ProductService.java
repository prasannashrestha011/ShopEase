package com.app.backend.Service.ProductService;

import java.util.List;
import java.util.Map;

import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import com.app.backend.Entities.ProductEntity;

public interface ProductService {
    ProductEntity getProductById(String product_id);

    ProductEntity getProductByName(String product_name);

    String createProduct(ProductEntity productEntity, MultiValueMap<String, MultipartFile> file, String sellerId);

    List<ProductEntity> getAllProducts();

    String deleteAllProductList();
}
