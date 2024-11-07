package com.app.backend.Service.RevenueService;

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

}
