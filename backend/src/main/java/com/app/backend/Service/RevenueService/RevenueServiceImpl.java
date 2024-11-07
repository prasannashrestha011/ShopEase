package com.app.backend.Service.RevenueService;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<RevenueEntity> getCurrentWeekRecords(String sellerId) {
        return revenueRepo.getRevenueRecordOfCurrentWeek(sellerId);
    }

}
