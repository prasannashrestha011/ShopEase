package com.app.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.RevenueEntity;
import java.util.List;

@Repository
public interface RevenueRepository extends JpaRepository<RevenueEntity, String> {
    List<RevenueEntity> findBySellerId(String sellerId);
}
