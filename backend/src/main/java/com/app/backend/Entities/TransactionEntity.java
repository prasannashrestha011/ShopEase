package com.app.backend.Entities;

import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "transactions_table")
public class TransactionEntity {
    @Id
    @Column(name = "transaction_id", unique = true, nullable = false)
    private String transactionId;

    @Column(name = "seller_id", nullable = false)
    private String sellerId;

    @Column(name = "customer_id", nullable = false)
    private String customerId;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "customer_contact", nullable = false)
    private Long customerContact;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "quantity", nullable = false)
    private Long productQuantity;

    @Column(name = "amount", nullable = false)
    private Long productAmount;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    private Date updateAt;

    @Column(name = "status", nullable = false)
    private String status = "pending";

    @PrePersist
    private void OnTransactionCreated() {
        transactionId = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        createdAt = new Date(System.currentTimeMillis());
        updateAt = new Date(System.currentTimeMillis());
    }

    @PreUpdate
    private void OnTransactionUpdate() {
        updateAt = new Date(System.currentTimeMillis());
    }
}
