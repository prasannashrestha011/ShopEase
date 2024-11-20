package com.app.backend.Repositories.Products;

import java.util.List;

import org.springframework.data.domain.Sort;
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

    List<ProductEntity> findProductBySellerId(String sellerId, Sort sort);

    @Modifying
    @Query("UPDATE ProductEntity p SET p.productName=:productName , p.productPrice=:productPrice , productDes=:productDes WHERE p.productId=:productId")
    int updateProductDetails(@Param("productId") String productId,
            @Param("productName") String productName,
            @Param("productPrice") Long productPrice,
            @Param("productDes") String productDes);

}
