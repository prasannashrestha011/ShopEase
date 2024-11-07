package com.app.backend.Service.RevenueService;

import java.util.List;

import com.app.backend.Entities.RevenueEntity;

public interface RevenueService {
    void createRevenueRecord(RevenueEntity revenueEntity);

    List<RevenueEntity> getAllRevenueRecords(String sellerId);

    String UpdateRevenueRecord(RevenueEntity revenueEntity);
}
