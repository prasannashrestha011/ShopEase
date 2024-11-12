package com.app.backend.Entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "notification_details")
public class NotificationEntity {

    @Id
    private String id;

    @Column(unique = true, nullable = false)
    private String token;

    @Column(unique = true, nullable = false)
    private String username;

    @PrePersist
    private void onCreate() {
        id = UUID.randomUUID().toString().substring(0, 16);
    }
}
