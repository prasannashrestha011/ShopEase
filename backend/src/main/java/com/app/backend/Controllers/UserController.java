package com.app.backend.Controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.Entities.UserDto;
import com.app.backend.Entities.UserEntity;
import com.app.backend.Responses.ApiResponse;
import com.app.backend.Service.UserService.UserServiceImpl;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserServiceImpl userServiceImpl;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

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

    @GetMapping("/details")
    public ResponseEntity<UserDto> getMethodName(@RequestParam(value = "id") String id) {
        if (id != null) {
            var response = userServiceImpl.findUserById(id);
            UserDto filterUser = new UserDto(response.getId(), response.getUsername(), response.getEmail(),
                    response.contactNumber, response.address);
            return ResponseEntity.ok().body(filterUser);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PutMapping("/update/user/status")
    public ResponseEntity<ApiResponse> updateUserActiveStatus(@RequestParam("id") String id,
            @RequestParam("status") boolean status) throws RuntimeException {
        try {
            userServiceImpl.updateUserActiveStatus(id, status);
            ApiResponse response = new ApiResponse("status updated");
            return ResponseEntity.ok().body(response);
        } catch (RuntimeException e) {
            ApiResponse responseErr = new ApiResponse(e.getMessage());
            return ResponseEntity.internalServerError().body(responseErr);

        }
    }

    @GetMapping("/lastupdate")
    public ResponseEntity<Date> getLastUserUpdate(@RequestParam(value = "id") String id) {
        if (id != null) {
            logger.info("user id {}", id);
            var response = userServiceImpl.findUserLastUpdate(id);
            logger.info("resposne data : {}", response);
            return ResponseEntity.ok().body(response);
        }
        return ResponseEntity.badRequest().body(null);
    }
}
