package com.app.backend.Service.CheckoutService;

import com.app.backend.Entities.TransactionEntity;
import com.app.backend.Repositories.TransactionRepository;

import jakarta.transaction.Transactional;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    TransactionRepository transactionRepo;

    private static final Logger logger = LoggerFactory.getLogger(CheckoutServiceImpl.class);

    @Override
    public void createEntry(TransactionEntity transactionEntity) {
        logger.info("name->{}", transactionEntity.getCustomerName());
        if (transactionEntity != null) {
            transactionRepo.save(transactionEntity);
        }

    }

    @Override
    public List<TransactionEntity> getEntriesBycustomerId(String customerId) {
        if (customerId != null) {
            var transactionList = transactionRepo.findByCustomerId(customerId);
            return transactionList;
        }
        return null;
    }

    @Override
    public List<TransactionEntity> getEntiresBysellerId(String sellerId) {
        if (sellerId != null) {
            var transactionList = transactionRepo.findBySellerId(sellerId);
            return transactionList;
        }
        return null;
    }

    @Override
    @Transactional
    public void updateEntryStatus(String transactionId, String status) {
        if (transactionId != null && status != null) {
            transactionRepo.updateStatusById(transactionId, status);
        }
    }
}
