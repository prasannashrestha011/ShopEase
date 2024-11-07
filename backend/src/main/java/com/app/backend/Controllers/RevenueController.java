package com.app.backend.Controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(RevenueController.class);

    @GetMapping("/records")
    public ResponseEntity<List<RevenueEntity>> getAllRecords(@RequestParam(value = "sellerId") String sellerId) {
        try {
            var recordList = revenueServiceImpl.getAllRevenueRecords(sellerId);
            return ResponseEntity.ok().body(recordList);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/current/week/records")
    public ResponseEntity<List<RevenueEntity>> getCurrentWeekRecords(
            @RequestParam(value = "sellerId") String sellerId) {
        try {
            if (sellerId.trim().isEmpty())
                throw new Exception("invalid request input");
            var records = revenueServiceImpl.getCurrentWeekRecords(sellerId);
            return ResponseEntity.ok().body(records);
        } catch (Exception e) {
            return ResponseEntity.ok().body(null);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createNewRecord(@RequestBody RevenueEntity revenueEntity) {
        try {

            if (revenueEntity == null) {
                throw new Exception("failed to insert the data");
            }
            logger.info("revenue details {} {} {}", revenueEntity.getSellerId(), revenueEntity.getTransactionId(),
                    revenueEntity.getAmount());

            var response = revenueServiceImpl.UpdateRevenueRecord(revenueEntity);
            ApiResponse message = new ApiResponse(response);
            return ResponseEntity.ok().body(message);

        } catch (Exception e) {
            ApiResponse responseErr = new ApiResponse(e.getMessage());
            return ResponseEntity.internalServerError().body(responseErr);
        }
    }
}
