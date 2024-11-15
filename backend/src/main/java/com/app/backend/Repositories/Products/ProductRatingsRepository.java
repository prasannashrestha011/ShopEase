package com.app.backend.Repositories.Products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.ProductQueries.ProductRatingEntity;

@Repository
public interface ProductRatingsRepository extends JpaRepository<ProductRatingEntity, String> {
    List<ProductRatingEntity> findByProductId(String productId);
}
