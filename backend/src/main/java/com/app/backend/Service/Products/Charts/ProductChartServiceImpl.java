package com.app.backend.Service.Products.Charts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.Entities.ChartEntity;
import com.app.backend.Repositories.ProductChartRepository;

@Service
public class ProductChartServiceImpl implements ProductChartService {

    @Autowired
    ProductChartRepository chartRepo;
    
    @Override
    public List<ChartEntity> getChartByUserId(String userId) {
        return chartRepo.findByUserId(userId);
    }

    @Override
    public void saveUserChart(ChartEntity chartEntity) {
        chartRepo.save(chartEntity);
        return;
    }
    
}
