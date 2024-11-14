package com.app.backend.Service.FireBaseService;

import com.app.backend.Entities.NotificationEntity;

public interface FireBaseMessagingService {
    public String getToken(String userId);

    public String saveToken(NotificationEntity notificationEntity);

    public String sendNotification(String token, String title, String body);
}
