package com.app.backend.Entities.ProductQueries;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "products_ratings")
public class ProductRatingEntity {

    @Id
    @Column(unique = true, nullable = false)
    private String ratedId;

    @Column(nullable = false)
    private String productId;

    @Column(nullable = false)
    private String ratedBy;

    @Column(nullable = false)
    private Double ratedValue;

    @Column(nullable = false)
    private String review;

    @Column(nullable = false)
    private Date createdAt;

    @PrePersist
    private void OnCreated() {
        ratedId = UUID.randomUUID().toString().substring(0, 16);
        createdAt = new Date();
    }
}