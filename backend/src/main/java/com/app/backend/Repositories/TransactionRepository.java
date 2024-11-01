package com.app.backend.Repositories;

import com.app.backend.Entities.TransactionEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<TransactionEntity, String> {
    List<TransactionEntity> findByCustomerId(String customerId);

    List<TransactionEntity> findBySellerId(String sellerId);
}
