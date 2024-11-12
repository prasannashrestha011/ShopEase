package com.app.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.backend.Entities.NotificationEntity;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, String> {
    NotificationEntity findByUsername(String username);

    String findTokenByUsername(String username);

    @Modifying
    @Query("UPDATE NotificationEntity n SET n.token=:token WHERE n.username=:username")
    void updateUserToken(@Param("username") String username, @Param("token") String token);
}
