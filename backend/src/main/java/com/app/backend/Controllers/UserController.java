package com.app.backend.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.Entities.UserEntity;
import com.app.backend.Service.UserService.UserServiceImpl;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserServiceImpl userServiceImpl;

    @GetMapping("/credentials")
    public ResponseEntity<UserEntity> getUserCredentials(
            @RequestParam(value = "user_id", required = false) String user_id,
            @RequestParam(value = "username", required = false) String username) {

        var response = (user_id != null) ? userServiceImpl.findUserById(user_id)
                : userServiceImpl.findUserByUsername(username);

        Map<String, Object> apiResponse = new HashMap<>();
        if (response == null) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        apiResponse.put("data", response);
        return ResponseEntity.ok().body(response);
    }

}
