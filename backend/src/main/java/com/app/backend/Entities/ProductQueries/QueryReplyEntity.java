package com.app.backend.Controllers.ProductQueries;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "queries_replies")
public class QueryReplyEntity {
    @Id
    private String replyId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String ansDesc;

    @ManyToOne // Many replies can belong to one product query
    @JoinColumn(name = "query_id", nullable = false) // Foreign key column
    private ProductQueryEntity productQuery;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @PrePersist
    private void OnCreated() {
        replyId = UUID.randomUUID().toString().substring(0, 16);
        createdAt = new Date();
    }
}