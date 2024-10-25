package com.app.backend.Controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {

    @GetMapping("/home")
    @PreAuthorize("hasRole('ADMIN')")
    public String homePage() {
        return "home page";
    }

}
