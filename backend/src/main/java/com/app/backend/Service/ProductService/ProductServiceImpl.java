package com.app.backend.Service.ProductService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.backend.Entities.ProductEntity;
import com.app.backend.Repositories.ProductRepository;
import com.app.backend.Service.CloudinaryService.CloudinaryImageServiceImpl;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepo;

    @Autowired
    CloudinaryImageServiceImpl cloudinaryImageService;

    @Override
    public ProductEntity getProductById(String product_id) {
        return productRepo.findById(product_id).orElse(null);
    }

    @Override
    public ProductEntity getProductByName(String product_name) {
        ProductEntity product = productRepo.findProductByProductName(product_name);
        if (product != null)
            return product;
        return null;
    }

    @Override
    public String createProduct(ProductEntity productEntity, MultipartFile file, String sellerId) {
        if (productEntity != null) {
            Map<String, Object> fileInfo = cloudinaryImageService.uploadImage(file);
            productEntity.setProductImage(fileInfo.get("secure_url").toString());
            productEntity.setSellerId(sellerId);
            productRepo.save(productEntity);
            return productEntity + " has been added ";
        }
        return null;
    }

    @Override
    public List<ProductEntity> getAllProducts() {
        var productList = productRepo.findAll();
        return productList;
    }

}
