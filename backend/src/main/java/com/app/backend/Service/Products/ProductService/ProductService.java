package com.app.backend.Service.Products.ProductService;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.app.backend.App_class.UpdateProductDetails;
import com.app.backend.Entities.ProductEntity;

public interface ProductService {
    ProductEntity getProductById(String product_id);

    List<ProductEntity> getProductByName(String product_name);

    CompletableFuture<String> createProduct(ProductEntity productEntity, List<MultipartFile> file, String sellerId);

    List<ProductEntity> getAllProducts(int page);

    Page<ProductEntity> getProductsBySellerId(String sellerId, int page, int size);

    int UpdateProductDetails(UpdateProductDetails updateProductDetails);

    String deleteAllProductList();

}
