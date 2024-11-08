package com.app.backend.Service.RevenueService;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.App_class.RevenueRecordByDay;
import com.app.backend.Entities.RevenueEntity;
import com.app.backend.Repositories.RevenueRepository;

@Service
public class RevenueServiceImpl implements RevenueService {

    @Autowired
    RevenueRepository revenueRepo;

    @Override
    public void createRevenueRecord(RevenueEntity revenueEntity) {
        revenueRepo.save(revenueEntity);
    }

    @Override
    public List<RevenueEntity> getAllRevenueRecords(String sellerId) {
        if (sellerId != null) {
            revenueRepo.findBySellerId(sellerId);
        }
        return null;
    }

    @Override
    public String UpdateRevenueRecord(RevenueEntity revenueEntity) {
        var isPresent = revenueRepo.UpdateRevenueRecord(revenueEntity.getSellerId(), new Date(),
                revenueEntity.getAmount());
        if (isPresent > 0) {
            return "revenue record updated";
        }
        revenueRepo.save(revenueEntity);
        return " new revenue record has been created";
    }

    @Override
    public List<RevenueEntity> getPrevWeekRecords(String sellerId) {
        return revenueRepo.getPrevWeekRevenueRecords(sellerId);
    }

    @Override
    public List<RevenueEntity> getCurrentWeekRecords(String sellerId) {
        return revenueRepo.getRevenueRecordOfCurrentWeek(sellerId);
    }

    @Override
    public Map<Integer, List<RevenueEntity>> getRecordsDay(String sellerId) {
        Map<Integer, List<RevenueEntity>> recordlist = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            var record = revenueRepo.getCurrentWeekDailyRecords(sellerId, i);
            recordlist.put(i, record);

        }
        return recordlist;
    }

    @Override
    public Map<Integer, RevenueRecordByDay> getRecordsOfPrevAndCurrentWeek(String sellerId) {
        RevenueRecordByDay prevRecordMap = new RevenueRecordByDay();
        RevenueRecordByDay currentRecordMap = new RevenueRecordByDay();
        Map<Integer, RevenueRecordByDay> aggregateRecordMap = new HashMap<>();
        // for previous week
        Map<Integer, List<RevenueEntity>> prevRecords = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            var record = revenueRepo.getPrevWeekDailyRecords(sellerId, i);
            prevRecords.put(i, record);
        }
        prevRecordMap.setRecords(prevRecords);

        // for current week
        Map<Integer, List<RevenueEntity>> currentRecords = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            var record = revenueRepo.getPrevWeekDailyRecords(sellerId, i);
            currentRecords.put(i, record);
        }
        currentRecordMap.setRecords(currentRecords);
        // aggregate records
        aggregateRecordMap.put(0, prevRecordMap);
        aggregateRecordMap.put(1, currentRecordMap);
        return aggregateRecordMap;
    }

}
