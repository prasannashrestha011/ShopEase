package com.app.backend.Service.Products.ProductRatingServices;

import java.util.List;

import com.app.backend.App_class.RatingAnalytics;
import com.app.backend.Entities.ProductQueries.ProductRatingEntity;

public interface ProductRatingService {
    String InsertProductRating(ProductRatingEntity productRatingEntity);

    List<ProductRatingEntity> GetProductRatings(String productId);

    List<ProductRatingEntity> GetRatingsBySellerId(String sellerId);

    RatingAnalytics GetRatingAnalytics(String sellerId);
}
