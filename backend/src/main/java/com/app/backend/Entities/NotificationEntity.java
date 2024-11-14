package com.app.backend.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "notification_tokens")
public class NotificationEntity {

    @Id
    private String userId;

    @Column(unique = true, nullable = false)
    private String token;

    @Column(unique = true, nullable = false)
    private String username;

}
