package com.app.backend.Service.Products.ProductRatingServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.Entities.ProductQueries.ProductRatingEntity;
import com.app.backend.Repositories.Products.ProductRatingsRepository;

@Service
public class ProductRatingServiceImpl implements ProductRatingService {

    @Autowired
    ProductRatingsRepository productRatingRepo;

    @Override
    public String InsertProductRating(ProductRatingEntity productRatingEntity) {
        productRatingRepo.save(productRatingEntity);
        return "rating inserted";
    }

    @Override
    public List<ProductRatingEntity> GetProductRatings(String productId) {
        return productRatingRepo.findByProductId(productId);
    }

}
