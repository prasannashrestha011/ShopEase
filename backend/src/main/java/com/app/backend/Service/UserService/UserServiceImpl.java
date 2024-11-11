package com.app.backend.Service.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.backend.App_class.CustomerDetails;
import com.app.backend.Entities.UserEntity;
import com.app.backend.Repositories.UserServiceRepository;

import jakarta.transaction.Transactional;

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
    public CustomerDetails getCustomerDetailsById(String customerId) {
        Optional<UserEntity> userDetails = userServiceRepository.findById(customerId);
        if (userDetails.isPresent()) {
            UserEntity user = userDetails.get();
            CustomerDetails customerDetails = new CustomerDetails(user.getId(),
                    user.getUserImage(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getContactNumber(),
                    user.getAddress(),
                    user.getPostalCode(),
                    user.getProvince());
            return customerDetails;
        }
        return null;
    }

}
