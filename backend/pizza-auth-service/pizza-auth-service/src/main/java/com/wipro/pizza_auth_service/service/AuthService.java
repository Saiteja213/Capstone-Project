package com.wipro.pizza_auth_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.wipro.pizza_auth_service.dto.AuthResponse;
import com.wipro.pizza_auth_service.dto.ChangePasswordRequest;
import com.wipro.pizza_auth_service.dto.LoginRequest;
import com.wipro.pizza_auth_service.dto.RegisterRequest;
import com.wipro.pizza_auth_service.model.PizzaUser;
import com.wipro.pizza_auth_service.repository.PizzaUserRepository;
import com.wipro.pizza_auth_service.security.JwtUtil;

@Service // Marks this class as a Service component 
public class AuthService {

    // Injecting PizzaUserRepository to interact with the database
    @Autowired
    private PizzaUserRepository repository;

    // Injecting JwtUtil class to generate JWT tokens
    @Autowired
    private JwtUtil jwtUtil;


    // ================================
    // USER REGISTRATION METHOD
    // ================================
    public String register(RegisterRequest request){

        // Create a new PizzaUser object
        PizzaUser user = new PizzaUser();

        // Set user details from the RegisterRequest DTO
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        // Assign default role as CUSTOMER
        user.setRole("CUSTOMER");

        // Save the user to the database
        repository.save(user);

        // Return success message
        return "User Registered Successfully";
    }


    // ================================
    // USER LOGIN METHOD
    // ================================
    public AuthResponse login(LoginRequest request){

        // Fetch user from database using email
        PizzaUser user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the user account is blocked
        if(user.isBlocked()){
            throw new RuntimeException("Your account is blocked by admin");
        }

        // Validate password
        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Invalid Password");
        }

        // Generate JWT token using email, role, and full name
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole(),
                user.getFullName()
        );

        // Return token and login success message
        return new AuthResponse(token,"Login Successful");
    }


    // ================================
    // CHANGE PASSWORD METHOD
    // ================================
    public String changePassword(ChangePasswordRequest request){

        // Get the currently logged-in user's email from Security Context
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // Fetch user from database
        PizzaUser user = repository.findByEmail(email)
                .orElseThrow();

        // Check if old password matches
        if(!user.getPassword().equals(request.getOldPassword())){
            throw new RuntimeException("Old password incorrect");
        }

        // Update password with new password
        user.setPassword(request.getNewPassword());

        // Save updated user in database
        repository.save(user);

        // Return success message
        return "Password updated successfully";
    }


    // ================================
    // GET USER BY EMAIL METHOD
    // ================================
    public PizzaUser getUserByEmail(String email){

        // Find user using email
        return repository
                .findByEmail(email)

                // Throw exception if user not found
                .orElseThrow(() -> new RuntimeException("User not found"));

    }
}