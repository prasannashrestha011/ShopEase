package com.app.backend.Repositories.Products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String> {

    List<ProductEntity> findProductByProductName(String product_name);

    List<ProductEntity> findProductByProductCategory(String category);

    List<ProductEntity> findProductBySellerId(String sellerId);

    @Modifying
    @Query("UPDATE ProductEntity p SET p.productName=:productName WHERE p.productId=:productId")
    int updateProductName(@Param("productId") String productId, @Param("productName") String productName);

    @Modifying
    @Query("UPDATE ProductEntity p SET p.productPrice=:productPrice WHERE p.productId=:productId")
    int updateProductPrice(@Param("productId") String productId, @Param("productPrice") Long productPrice);

    @Modifying
    @Query("UPDATE ProductEntity p SET p.productDes=:productDes WHERE p.productId=:productId")
    int updateProductDesc(@Param("productId") String productId, @Param("productDes") String productDes);
}
