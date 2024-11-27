package com.app.backend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.ChartEntity;

@Repository
public interface ProductChartRepository extends JpaRepository<ChartEntity,String>{
    
    List<ChartEntity> findByUserId(String id);
}
