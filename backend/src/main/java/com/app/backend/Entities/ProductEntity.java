package com.app.backend.Entities;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_list")
public class ProductEntity {
    @Id
    @Column(nullable = false, updatable = false, unique = true, name = "product_id")
    private String productId;

    @Column(nullable = false, name = "product_name")
    private String productName;

    @Column(nullable = false, name = "product_price")
    private Long productPrice;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "product_images")
    private List<String> productImages;

    @Column(nullable = false, name = "product_des")
    private String productDes;

    @Column(nullable = false, name = "seller_id")
    private String sellerId;

    @Column(nullable = false, updatable = false, name = "created_at")
    private Date createdAt;

    @Column(nullable = false, name = "updated_at")
    private Date updatedAt;

    @Column(nullable = false, name = "category")
    private String productCategory;

    @Column(nullable = false)
    private Long productViews = 0L;

    @PrePersist
    protected void OnCreated() {
        productId = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        createdAt = new Date();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void OnUpdate() {
        updatedAt = new Date();
    }
}
