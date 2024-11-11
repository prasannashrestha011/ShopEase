package com.app.backend.Service.UserService;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.app.backend.App_class.CustomerDetails;
import com.app.backend.Entities.UserEntity;

public interface UserService {
    UserEntity findUserById(String userId) throws UsernameNotFoundException;

    UserEntity findUserByUsername(String username) throws UsernameNotFoundException;

    String registerNewUser(UserEntity user, List<String> role);

    CustomerDetails getCustomerDetailsById(String customerId);
}
