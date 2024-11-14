package com.app.backend.Service.FireBaseService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.Entities.NotificationEntity;
import com.app.backend.Repositories.NotificationRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import jakarta.transaction.Transactional;

@Service
public class FireBaseMessagingServiceImpl implements FireBaseMessagingService {

    @Autowired
    private NotificationRepository notificationRepo;

    private static final Logger logger = LoggerFactory.getLogger(FireBaseMessagingServiceImpl.class);

    @Override
    public String sendNotification(String token, String title, String body) {
        try {
            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build())
                    .build();
            return FirebaseMessaging.getInstance().send(message);
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    @Transactional
    public String saveToken(NotificationEntity notificationEntity) {
        logger.info("username {}", notificationEntity.getToken());
        try {
            var isExist = notificationRepo.findByUsername(notificationEntity.getUsername());
            if (isExist != null) {
                var message = String.format("exists username %s", notificationEntity.getToken());
                System.out.println(message);
                notificationRepo.updateUserToken(isExist.getUsername(),
                        notificationEntity.getToken());
                return "token updated";
            }
            notificationRepo.save(notificationEntity);
            return "token saved asdf";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return e.getMessage();
        }
    }

    @Override
    public String getToken(String userId) {
        return notificationRepo.findTokenByUserId(userId);
    }

}
