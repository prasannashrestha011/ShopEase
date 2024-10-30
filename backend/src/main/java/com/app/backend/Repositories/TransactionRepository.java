package com.app.backend.Repositories;


import com.app.backend.Entities.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<TransactionEntity,String> {
}
