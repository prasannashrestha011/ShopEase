package com.app.backend.Service.Products.ProductService;

import java.util.ArrayList;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import com.app.backend.Entities.ProductEntity;
import com.app.backend.Repositories.Products.ProductRepository;
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
    public List<ProductEntity> getProductByName(String product_name) {
        List<ProductEntity> product = productRepo.findProductByProductName(product_name);
        if (product.isEmpty()) {
            var alternateProduct = productRepo.findProductByProductCategory(product_name);
            return !alternateProduct.isEmpty() ? alternateProduct : null;
        }
        return product;
    }

    // ## product Thread ##//
    @Override
    public CompletableFuture<String> createProduct(ProductEntity productEntity, List<MultipartFile> files,
            String sellerId) {
        try {
            List<String> productImages = new ArrayList<>();
            List<CompletableFuture<String>> uploadFutureResults = new ArrayList<>();
            if (productEntity != null) {
                for (MultipartFile multipartFile : files) {

                    if (!"blob".equals(multipartFile.getOriginalFilename())) {
                        logger.info("File received: {} with size: {}", multipartFile.getOriginalFilename(),
                                multipartFile.getSize());

                        if (multipartFile.isEmpty()) {
                            logger.warn("MultipartFile is empty");
                            continue;
                        }

                        // Convert MultipartFile to byte array
                        byte[] fileBytes = multipartFile.getBytes();

                        // handle File upload
                        CompletableFuture<String> uploadResult = createProductAsync(fileBytes, sellerId);

                        uploadFutureResults.add(uploadResult);
                    }
                }
            }

            return CompletableFuture.allOf(uploadFutureResults.toArray(new CompletableFuture[0])).thenApply(v -> {
                for (CompletableFuture<String> futureResult : uploadFutureResults) {
                    try {
                        productImages.add(futureResult.join());
                    } catch (Exception e) {
                        logger.error("Error while adding url {}", e.getMessage());
                    }
                }
                productEntity.setProductImages(productImages);
                productEntity.setSellerId(sellerId);
                productRepo.save(productEntity);
                return productEntity.getProductName() + " has been added ";
            });
        } catch (Exception e) {
            logger.error("Error creating product", e);
            return CompletableFuture.completedFuture("Error occurred while creating product.");
        }
    }

    @Async
    public CompletableFuture<String> createProductAsync(byte[] fileBytes, String sellerId) {
        try {

            Map<String, Object> fileInfo = cloudinaryImageService.uploadImage(fileBytes);
            String fileUrl = fileInfo.get("secure_url").toString();

            return CompletableFuture.completedFuture(fileUrl);
        } catch (Exception e) {
            logger.error("Error uploading file in async thread", e);
            return CompletableFuture.completedFuture("Error occurred while uploading file.");
        }
    }
    // ## product Thread ##//

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
