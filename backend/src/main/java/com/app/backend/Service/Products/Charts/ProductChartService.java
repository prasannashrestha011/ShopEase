package com.app.backend.Service.Products.Charts;

import java.util.List;

import com.app.backend.Entities.ChartEntity;

public interface ProductChartService {
    List<ChartEntity> getChartByUserId(String userId);
    void saveUserChart(ChartEntity chartEntity);
}
