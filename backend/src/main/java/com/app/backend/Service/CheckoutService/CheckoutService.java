package com.app.backend.Service.CheckoutService;

import java.util.List;

import com.app.backend.Entities.TransactionEntity;

public interface CheckoutService {
     void createEntry(TransactionEntity transactionEntity);

     void updateEntryStatus(String transactionId, String status);

     List<TransactionEntity> getEntriesBycustomerId(String customerId);

     List<TransactionEntity> getEntiresBysellerId(String sellerId);

}
