package com.app.backend.Service.Products.ProductRatingServices;

import java.util.List;

import com.app.backend.Entities.ProductQueries.ProductRatingEntity;

public interface ProductRatingService {
    String InsertProductRating(ProductRatingEntity productRatingEntity);

    List<ProductRatingEntity> GetProductRatings(String productId);
}
