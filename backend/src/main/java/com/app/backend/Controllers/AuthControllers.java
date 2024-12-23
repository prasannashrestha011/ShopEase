package com.app.backend.Controllers;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.Entities.UserEntity;
import com.app.backend.Jwt.JwtService;
import com.app.backend.Responses.ApiResponse;

import com.app.backend.Service.UserService.UserServiceImpl;

@RestController

@RequestMapping("/account")
public class AuthControllers {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserServiceImpl userService;

    @Autowired
    JwtService jwtService;

    private static final Logger logger = LoggerFactory.getLogger(AuthControllers.class);

    @PostMapping("/login")
    public ResponseEntity<Object> signInUser(@RequestBody UserEntity authUser) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authUser.getUsername(), authUser.getPassword()));
          
            var authUserDetails = userService.findUserByUsername(authUser.username);
            if (authUserDetails == null)
                throw new Exception("User details empty");

            var authToken = jwtService.generateToken(authUserDetails);
            ResponseCookie cookie = ResponseCookie.from("Authorization", authToken)
                    .httpOnly(true)
                    .secure(false) // for local development only
                    .sameSite("Lax")
                    .maxAge(Duration.ofDays(7))
                    .path("/")
                    .build();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .header("Authorization", "Bearer " + authToken).body(Map.of("id",authUserDetails.getId()));
        } catch (Exception e) {
          
            return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> signUpUser(@RequestBody UserEntity newUser,
            @RequestParam(value = "role", required = false) String userRole) {
        try {
            List<String> roles = new ArrayList<>();
            if (userRole != null) {
                roles.add(userRole.toUpperCase());
            }
            roles.add("USER");
            logger.info("user cred -> {}", newUser.username, newUser.password, newUser.contactNumber, newUser.address,
                    newUser.postalCode, newUser.province);
            userService.registerNewUser(newUser, roles);
            var response = new ApiResponse("user registered");
            return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse err = new ApiResponse("user already registered");
            return new ResponseEntity<ApiResponse>(err, HttpStatus.BAD_REQUEST);
        }
    }
}
