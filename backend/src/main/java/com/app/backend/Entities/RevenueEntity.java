package com.app.backend.Entities;

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
@Table(name = "revenue_records")
public class RevenueEntity {
    @Id
    @Column(name = "revenue_id", nullable = false, unique = true)
    private String revenueId;

    @Column(name = "seller_id", nullable = false)
    private String sellerId;

    @Column(name = "transaction_id", nullable = false)
    private String transactionId;

    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "created_at")
    private Date createAt;

    @PrePersist
    private void onRevenueCreated() {
        revenueId = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        createAt = new Date();
    }
}
