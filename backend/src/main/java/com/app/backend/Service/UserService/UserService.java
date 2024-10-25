package com.app.backend.Service.UserService;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.app.backend.Entities.UserEntity;
import com.app.backend.Responses.ApiResponse;

public interface UserService {
    UserEntity findUserById(String userId) throws UsernameNotFoundException;

    UserEntity findUserByUsername(String username) throws UsernameNotFoundException;

    ApiResponse registerNewUser(UserEntity user, List<String> role);
}
