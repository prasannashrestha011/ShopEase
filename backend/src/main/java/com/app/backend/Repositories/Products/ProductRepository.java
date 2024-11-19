package com.app.backend.Repositories.Products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String> {

    List<ProductEntity> findProductByProductName(String product_name);

    List<ProductEntity> findProductByProductCategory(String category);

    List<ProductEntity> findProductBySellerId(String sellerId);
}
