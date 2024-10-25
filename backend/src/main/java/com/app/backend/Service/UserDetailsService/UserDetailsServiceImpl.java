package com.app.backend.Service.UserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.backend.Repositories.UserServiceRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserServiceRepository userServiceRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var findUser = userServiceRepository.findByUsername(username);
        if (findUser != null) {
            String[] roles = findUser.getRoles().toArray(new String[0]);
            return org.springframework.security.core.userdetails.User.builder()
                    .username(findUser.getUsername())
                    .password(findUser.getPassword())
                    .roles(roles)
                    .build();
        }
        throw new UsernameNotFoundException("User not found");
    }

}
