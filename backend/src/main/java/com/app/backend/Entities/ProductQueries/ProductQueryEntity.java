package com.app.backend.Entities.ProductQueries;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;

import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_queries")
public class ProductQueryEntity {

    @Id
    @Column(name = "query_id", unique = true, nullable = false)
    private String queryId;

    @Column(nullable = false)
    private String productId;

    @Column(nullable = false)
    private String sellerId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, name = "question_Desc")
    private String questionDesc;

    @OneToMany(mappedBy = "productQuery", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<QueryReplyEntity> replies = new ArrayList<>();

    @Column(nullable = false, name = "created_at")
    private Date createdAt;

    @PrePersist
    private void OnCreated() {
        queryId = UUID.randomUUID().toString().substring(0, 16);
        createdAt = new Date();
    }
}
