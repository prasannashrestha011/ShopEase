package com.app.backend.Controllers;

import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.App_class.NotificationBody;
import com.app.backend.Entities.NotificationEntity;
import com.app.backend.Service.FireBaseService.FireBaseMessagingServiceImpl;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    FireBaseMessagingServiceImpl fireBaseMessagingServiceImpl;

    @GetMapping("/get/token")
    public ResponseEntity<Object> getToken(@RequestParam("userId") String userId) {
        try {
            var tokenString = fireBaseMessagingServiceImpl.getToken(userId);
            if (tokenString.isEmpty())
                throw new Exception("token not found");
            return ResponseEntity.ok().body(Map.of("token", tokenString));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body(e.getMessage());
        }
    }

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
        System.out.println("new notification request");
        var response = fireBaseMessagingServiceImpl.sendNotification(
                notificationBody.getToken(),
                notificationBody.getTitle(),
                notificationBody.getBody());
        if (response.isEmpty())
            return ResponseEntity.internalServerError().body(Map.of("error", "failed to send notification"));
        return ResponseEntity.ok().body(Map.of("sucess", response));
    }
}
