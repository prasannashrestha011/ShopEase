package com.app.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.Entities.RevenueEntity;
import com.app.backend.Responses.ApiResponse;
import com.app.backend.Service.RevenueService.RevenueServiceImpl;

@RestController
@RequestMapping("/revenue")
@PreAuthorize("hasRole('SELLER')")
public class RevenueController {

    @Autowired
    RevenueServiceImpl revenueServiceImpl;

    @GetMapping("/records")
    public ResponseEntity<List<RevenueEntity>> getAllRecords(@RequestParam(value = "sellerId") String sellerId) {
        try {
            var recordList = revenueServiceImpl.getAllRevenueRecords(sellerId);
            return ResponseEntity.ok().body(recordList);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createNewRecord(@RequestBody RevenueEntity revenueEntity) {
        try {
            if (revenueEntity != null) {
                revenueServiceImpl.createRevenueRecord(revenueEntity);
                ApiResponse response = new ApiResponse("new record has been added");
                return ResponseEntity.ok().body(response);
            }
            throw new Exception("invalid request body");
        } catch (Exception e) {
            ApiResponse responseErr = new ApiResponse(e.getMessage());
            return ResponseEntity.internalServerError().body(responseErr);
        }
    }
}
