package com.app.backend.Service.UserService;

import java.sql.Date;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.backend.Entities.UserEntity;
import com.app.backend.Repositories.UserServiceRepository;
import com.app.backend.Responses.ApiResponse;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserServiceRepository userServiceRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserEntity findUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity findUser = userServiceRepository.findByUsername(username);
        if (findUser != null) {
            return findUser;
        }
        throw new UsernameNotFoundException("user not found");
    }

    @Override
    public ApiResponse registerNewUser(UserEntity user, List<String> userRoles) {
        try {

            if (user != null) {

                user.setPassword(passwordEncoder.encode(user.getPassword()));

                user.setCreated_at(new Date(System.currentTimeMillis()));
                user.setRoles(userRoles);
                userServiceRepository.save(user);
                return new ApiResponse(user.getUsername() + " has been registered");
            }
            throw new Exception("Invalid user info");
        } catch (Exception e) {
            return new ApiResponse(e.getMessage());
        }
    }

    @Override
    public UserEntity findUserById(String userId) throws UsernameNotFoundException {
        UserEntity user = userServiceRepository.findById(userId);
        if (user != null) {
            return user;
        }
        return null;
    }

}
