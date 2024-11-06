package com.app.backend.Service.UserService;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.backend.Controllers.UserController;

import com.app.backend.Entities.UserEntity;
import com.app.backend.Repositories.UserServiceRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserServiceRepository userServiceRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Override
    public UserEntity findUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity findUser = userServiceRepository.findByUsername(username);
        if (findUser != null) {
            return findUser;
        }
        throw new UsernameNotFoundException("user not found");
    }

    @Override
    @Transactional
    public String registerNewUser(UserEntity user, List<String> userRoles) {
        try {

            if (user != null) {

                user.setPassword(passwordEncoder.encode(user.getPassword()));

                user.setRoles(userRoles);
                userServiceRepository.save(user);
                return user.getUsername() + " has been registered";
            }
            throw new Exception("Invalid user info");
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public UserEntity findUserById(String userId) throws UsernameNotFoundException {
        return userServiceRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));
    }

    @Override
    public Date findUserLastUpdate(String id) {
        if (id != null) {
            var data = userServiceRepository.findUpdateAtById(id);
            logger.info("data {}", data);
            return data.getUpdateAt();
        }
        return null;
    }

    @Override
    public void updateUserActiveStatus(String id, boolean status) {
        if (id != null) {
            userServiceRepository.updateUserActiveStatus(id, status);
        }
    }

}
