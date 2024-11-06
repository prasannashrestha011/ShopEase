package com.app.backend.Entities;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    @Column(name = "customer_email", nullable = false)
    private String customerEmail;

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

    @Column(name = "is_read", nullable = false)
    @JsonProperty("isRead")
    private boolean isRead = false;

    @Column(name = "status", nullable = false)
    private String status = "pending";

    @Column(name = "delivery_type", nullable = false)
    private String deliveryType;

    @PrePersist
    private void OnTransactionCreated() {
        transactionId = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        createdAt = new Date();
        updateAt = new Date();
    }

    @PreUpdate
    private void OnTransactionUpdate() {
        updateAt = new Date();
    }
}
