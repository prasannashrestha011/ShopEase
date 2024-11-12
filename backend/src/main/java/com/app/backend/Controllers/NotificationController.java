package com.app.backend.Controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.App_class.NotificationBody;
import com.app.backend.Entities.NotificationEntity;
import com.app.backend.Service.FireBaseService.FireBaseMessagingServiceImpl;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    FireBaseMessagingServiceImpl fireBaseMessagingServiceImpl;

    @PostMapping("/save/token")
    public ResponseEntity<Object> saveToken(@RequestBody NotificationEntity notificationEntity) {
        try {
            var response = fireBaseMessagingServiceImpl.saveToken(notificationEntity);
            return ResponseEntity.ok().body(Map.of("sucess", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "failed to  save the token"));
        }
    }

    @PostMapping("/send")
    public ResponseEntity<Object> sendNotification(@RequestBody NotificationBody notificationBody) {
        var response = fireBaseMessagingServiceImpl.sendNotification(
                notificationBody.getToken(),
                notificationBody.getTitle(),
                notificationBody.getBody());
        if (response.isEmpty())
            return ResponseEntity.internalServerError().body(Map.of("error", "failed to send notification"));
        return ResponseEntity.ok().body(Map.of("sucess", response));
    }
}
