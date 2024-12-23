package com.app.backend.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.Entities.UserDto;
import com.app.backend.Entities.UserEntity;
import com.app.backend.Service.UserService.UserServiceImpl;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserServiceImpl userServiceImpl;

    @GetMapping("/credentials")
    public ResponseEntity<UserEntity> getUserCredentials(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "username", required = false) String username) {

        var response = (!userId.isEmpty()) ? userServiceImpl.findUserById(userId)
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

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/customer/details")
    public ResponseEntity<Object> getCustomerDetails(@RequestParam(value = "customerId") String customerId) {
        try {
            var response = userServiceImpl.getCustomerDetailsById(customerId);
            if (response == null)
                throw new Exception("customer not found");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
