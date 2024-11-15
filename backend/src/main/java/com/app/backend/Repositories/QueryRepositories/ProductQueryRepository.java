package com.app.backend.Repositories.QueryRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.Entities.ProductQueries.ProductQueryEntity;

public interface ProductQueryRepository extends JpaRepository<ProductQueryEntity, String> {
    List<ProductQueryEntity> findBySellerId(String sellerId);

    List<ProductQueryEntity> findByProductId(String productId);
}
