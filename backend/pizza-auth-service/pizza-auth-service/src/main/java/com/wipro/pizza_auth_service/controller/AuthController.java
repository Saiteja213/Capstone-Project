package com.wipro.pizza_auth_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wipro.pizza_auth_service.dto.AuthResponse;
import com.wipro.pizza_auth_service.dto.ChangePasswordRequest;
import com.wipro.pizza_auth_service.dto.LoginRequest;
import com.wipro.pizza_auth_service.dto.RegisterRequest;
import com.wipro.pizza_auth_service.service.AuthService;

@RestController // Marks this class as a REST API controller
@RequestMapping("/api/auth") // Base URL for all authentication APIs
@CrossOrigin // Allows requests from frontend (React.)
public class AuthController {

    @Autowired
    private AuthService authService; // Service layer handling authentication logic

    // API to register a new user
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    // API to login user and generate JWT token
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
        return authService.login(request);
    }

    // API for logged-in user to change password
    @PutMapping("/change-password")
    public String changePassword(@RequestBody ChangePasswordRequest request){
        return authService.changePassword(request);
    }

    // Test API to check if authentication service is running
    @GetMapping("/test")
    public String test(){
        return "JWT Authentication working";
    }
}