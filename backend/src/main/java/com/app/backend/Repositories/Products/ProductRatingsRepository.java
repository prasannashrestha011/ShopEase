package com.app.backend.Repositories.Products;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.ProductQueries.ProductRatingEntity;

@Repository
public interface ProductRatingsRepository extends JpaRepository<ProductRatingEntity, String> {
    List<ProductRatingEntity> findByProductIdOrderByCreatedAtDesc(String productId, Pageable pageable);

    List<ProductRatingEntity> findBySellerId(String sellerId);

    @Query("SELECT SUM(p.ratedValue)/COUNT(*) from ProductRatingEntity p WHERE p.sellerId=:sellerId")
    Double findAverageRatingValue(@Param("sellerId") String sellerId);

    @Query("SELECT COUNT(*) FROM ProductRatingEntity p WHERE p.sellerId=:sellerId")
    Long findTotalReviews(@Param("sellerId") String sellerId);

    @Query("SELECT p FROM ProductRatingEntity p WHERE p.ratedValue=( SELECT MAX(pr.ratedValue) FROM ProductRatingEntity pr WHERE pr.sellerId=:sellerId) ")
    ProductRatingEntity findHighestRatedReview(@Param("sellerId") String sellerId);
}
