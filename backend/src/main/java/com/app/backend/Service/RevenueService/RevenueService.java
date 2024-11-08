package com.app.backend.Service.RevenueService;

import java.util.List;
import java.util.Map;

import com.app.backend.Entities.RevenueEntity;

public interface RevenueService {
    void createRevenueRecord(RevenueEntity revenueEntity);

    List<RevenueEntity> getAllRevenueRecords(String sellerId);

    List<RevenueEntity> getCurrentWeekRecords(String sellerId);

    Map<Integer, List<RevenueEntity>> getRecordsDay(String sellerId);

    String UpdateRevenueRecord(RevenueEntity revenueEntity);

}
