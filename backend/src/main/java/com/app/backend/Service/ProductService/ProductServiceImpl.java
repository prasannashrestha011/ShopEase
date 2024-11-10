package com.app.backend.Service.ProductService;

import java.util.ArrayList;

import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
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
    private static final Logger logger = (Logger) LoggerFactory.getLogger(ProductServiceImpl.class);

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
    public String createProduct(ProductEntity productEntity,
            List<MultipartFile> files, String sellerId) {

        List<String> productImages = new ArrayList<String>();

        if (productEntity != null) {

            for (MultipartFile multipartFile : files) {
                if (!"blob".equals(multipartFile.getOriginalFilename())) {
                    logger.info("uploaded file name {}", multipartFile.getOriginalFilename());
                    Map<String, Object> fileInfo = cloudinaryImageService.uploadImage(multipartFile);
                    productImages.add(fileInfo.get("secure_url").toString());
                }

            }

        }

        productEntity.setProductImages(productImages);
        productEntity.setSellerId(sellerId);
        productRepo.save(productEntity);
        return productEntity.getProductName() + " has been added ";

    }

    @Override
    public List<ProductEntity> getAllProducts() {
        var productList = productRepo.findAll();
        return productList;
    }

    @Override
    public String deleteAllProductList() {
        try {
            productRepo.deleteAll();
            cloudinaryImageService.deleteCollection();
            return "deleted";
        } catch (Exception e) {
            throw new RuntimeException("throw new error");
        }
    }

}
