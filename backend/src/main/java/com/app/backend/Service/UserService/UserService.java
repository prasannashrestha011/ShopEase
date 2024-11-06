package com.app.backend.Service.UserService;

import java.util.Date;
import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.app.backend.Entities.UserEntity;

public interface UserService {
    UserEntity findUserById(String userId) throws UsernameNotFoundException;

    UserEntity findUserByUsername(String username) throws UsernameNotFoundException;

    String registerNewUser(UserEntity user, List<String> role);

    void updateUserActiveStatus(String id, boolean status);

    Date findUserLastUpdate(String id);
}
