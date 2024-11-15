package com.app.backend.Entities.ProductQueries;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "queries_replies")
public class QueryReplyEntity {
    @Id
    private String replyId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String ansDesc;

    @ManyToOne
    @JoinColumn(name = "query_id", nullable = true)
    @JsonBackReference
    private ProductQueryEntity productQuery;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @PrePersist
    private void OnCreated() {
        replyId = UUID.randomUUID().toString().substring(0, 16);
        createdAt = new Date();
    }
}