package com.app.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.RevenueEntity;

import jakarta.transaction.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface RevenueRepository extends JpaRepository<RevenueEntity, String> {
        List<RevenueEntity> findBySellerId(String sellerId);

        @Query("SELECT r FROM RevenueEntity r " +
                        "WHERE EXTRACT(MONTH FROM r.createdAt) = EXTRACT(MONTH FROM CURRENT_DATE) " +
                        "AND EXTRACT(YEAR FROM r.createdAt) = EXTRACT(YEAR FROM CURRENT_DATE) " +
                        "AND FLOOR((EXTRACT(DAY FROM r.createdAt) - 1) / 7) + 1 = FLOOR((EXTRACT(DAY FROM CURRENT_DATE) - 1) / 7) + 1 "
                        +
                        "AND r.sellerId = ?1")
        List<RevenueEntity> getRevenueRecordOfCurrentWeek(String sellerId);

        @Query(value = "SELECT r.* FROM revenue_records r " +
                        "WHERE DATE(r.created_at) = DATE(CURRENT_DATE - INTERVAL '1 day' * (EXTRACT(DOW FROM CURRENT_DATE) - ?2)) "
                        +
                        "AND EXTRACT(MONTH FROM r.created_at) = EXTRACT(MONTH FROM CURRENT_DATE) " +
                        "AND EXTRACT(YEAR FROM r.created_at) = EXTRACT(YEAR FROM CURRENT_DATE) " +
                        "AND r.seller_id = ?1", nativeQuery = true)

        List<RevenueEntity> getRevenueRecordOfDay(String sellerId, int day);

        @Modifying
        @Transactional
        @Query("Update RevenueEntity t SET t.amount=t.amount + ?3 WHERE FUNCTION('DATE',t.createdAt)=FUNCTION('DATE',?2) AND t.sellerId=?1")
        int UpdateRevenueRecord(String sellerId, Date createdAt, Long amount);
}
