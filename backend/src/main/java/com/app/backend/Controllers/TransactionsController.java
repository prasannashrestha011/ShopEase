package com.app.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.Entities.TransactionEntity;
import com.app.backend.Responses.ApiResponse;
import com.app.backend.Service.CheckoutService.CheckoutServiceImpl;

@RestController
@RequestMapping("/transaction")
public class TransactionsController {
    @Autowired
    CheckoutServiceImpl checkoutServiceImpl;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createNewEntry(@RequestBody TransactionEntity transactionDetails) {
        if (transactionDetails != null) {
            checkoutServiceImpl.createEntry(transactionDetails);
            ApiResponse response = new ApiResponse("entry has been added");
            return ResponseEntity.ok().body(response);
        }
        ApiResponse response = new ApiResponse("failed to create the entry");
        return ResponseEntity.internalServerError().body(response);
    }

    @GetMapping("/customer/entries")
    public ResponseEntity<List<TransactionEntity>> getCustomerEntries(
            @RequestParam(name = "customer_id") String customerId) {
        try {
            var response = checkoutServiceImpl.getEntriesBycustomerId(customerId);
            if (response == null)
                throw new Exception("Entries not found");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return null;
        }
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller/entries")
    public ResponseEntity<List<TransactionEntity>> getSellerEntries(@RequestParam(name = "seller_id") String sellerId) {
        try {
            var response = checkoutServiceImpl.getEntiresBysellerId(sellerId);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return null;
        }
    }

    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/seller/update/entry/status")
    public ResponseEntity<ApiResponse> updateEntryStatus(@RequestParam(name = "transactionId") String transactionId,
            @RequestParam(name = "status") String status) {
        try {
            if (status != null) {
                checkoutServiceImpl.updateEntryStatus(transactionId, status);
                ApiResponse response = new ApiResponse("entry has been updated");
                return ResponseEntity.ok().body(response);
            }
            ApiResponse error = new ApiResponse("failed to update the entry");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            if (status != null) {
                checkoutServiceImpl.updateEntryStatus(transactionId, status);
                ApiResponse response = new ApiResponse("entry has been updated");
                return ResponseEntity.ok().body(response);
            }
            ApiResponse error = new ApiResponse(e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

}
