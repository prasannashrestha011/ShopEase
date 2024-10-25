package com.app.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.UserEntity;

@Repository
public interface UserServiceRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findById(String userId);

    UserEntity findByUsername(String username);
}
