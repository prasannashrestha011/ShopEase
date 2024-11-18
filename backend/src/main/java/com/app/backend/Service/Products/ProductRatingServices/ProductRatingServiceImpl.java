package com.app.backend.Service.Products.ProductRatingServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.app.backend.Entities.ProductQueries.ProductRatingEntity;
import com.app.backend.Repositories.Products.ProductRatingsRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class ProductRatingServiceImpl implements ProductRatingService {

    @Autowired
    ProductRatingsRepository productRatingRepo;

    @Override
    public String InsertProductRating(ProductRatingEntity productRatingEntity) {
        productRatingRepo.save(productRatingEntity);
        return "Thanks for your rating";
    }

    @Override
    public List<ProductRatingEntity> GetProductRatings(String productId) {
        Pageable pageable = PageRequest.of(0, 3);
        return productRatingRepo.findByProductIdOrderByCreatedAtDesc(productId, pageable);
    }

}
