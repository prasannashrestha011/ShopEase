package com.app.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.UpdateAtProjection;
import com.app.backend.Entities.UserEntity;

@Repository
public interface UserServiceRepository extends JpaRepository<UserEntity, String> {

    UserEntity findByUsername(String username);

    UpdateAtProjection findUpdateAtById(@Param("id") String id);

    @Modifying
    @Query("UPDATE UserEntity u set u.activeStatus=:status WHERE u.id=:id")
    void updateUserActiveStatus(@Param("id") String id, @Param("status") boolean status);
}
