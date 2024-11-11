package com.app.backend.Repositories;

import com.app.backend.Entities.TransactionEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TransactionRepository extends JpaRepository<TransactionEntity, String> {
    List<TransactionEntity> findByCustomerId(String customerId);

    List<TransactionEntity> findBySellerIdOrderByCreatedAtDesc(String sellerId);

    @Modifying
    @Query("UPDATE TransactionEntity  t set t.status=?2 WHERE t.transactionId=?1 ")
    void updateStatusById(String transactionId, String status);

    @Modifying
    @Query("UPDATE TransactionEntity t set t.isRead=true WHERE t.transactionId=?1")
    void updateReadStatus(String transactionId);

    @Query("SELECT t From TransactionEntity t WHERE t.status='approved' AND t.sellerId=?1 ")
    List<TransactionEntity> getApprovedTransactionEntity(String sellerId);
}
