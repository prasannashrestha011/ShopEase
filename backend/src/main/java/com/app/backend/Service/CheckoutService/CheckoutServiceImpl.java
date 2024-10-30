package com.app.backend.Service.CheckoutService;


import com.app.backend.Entities.TransactionEntity;
import com.app.backend.Repositories.TransactionRepository;
import com.app.backend.Responses.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

public class CheckoutServiceImpl implements  CheckoutService{

    @Autowired
    TransactionRepository transactionRepo;

    @Override
    public void createEntry(TransactionEntity transactionEntity) {
        if(transactionEntity!=null){
            transactionRepo.save(transactionEntity);
        }
       
    }
}
