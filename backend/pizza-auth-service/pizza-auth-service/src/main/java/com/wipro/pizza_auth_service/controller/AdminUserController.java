package com.wipro.pizza_auth_service.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.wipro.pizza_auth_service.model.PizzaUser;
import com.wipro.pizza_auth_service.repository.PizzaUserRepository;
import com.wipro.pizza_auth_service.service.AuthService;

@RestController // Marks this class as a REST API controller
@RequestMapping("/api/admin/users") // Base URL for admin user management APIs
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access from Vite/React app
public class AdminUserController {

@Autowired
private PizzaUserRepository userRepository; // Used to perform database operations

@Autowired
private AuthService authService; // Used to fetch user information


/* ============================= */
/* VIEW ALL USERS */
/* ============================= */

@PreAuthorize("hasRole('ADMIN')") // Only ADMIN users can access this API
@GetMapping
public List<PizzaUser> getAllUsers(){
    return userRepository.findAll(); // Fetch all users from database
}


/* ============================= */
/* BLOCK USER */
/* ============================= */

@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/{id}/block")
public PizzaUser blockUser(@PathVariable Long id){

    // Find user by ID
    PizzaUser user = userRepository.findById(id).orElseThrow();

    // Mark the user as blocked
    user.setBlocked(true);

    // Save updated user
    return userRepository.save(user);
}


/* ============================= */
/* UNBLOCK USER */
/* ============================= */

@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/{id}/unblock")
public PizzaUser unblockUser(@PathVariable Long id){

    // Find user by ID
    PizzaUser user = userRepository.findById(id).orElseThrow();

    // Mark the user as unblocked
    user.setBlocked(false);

    // Save updated user
    return userRepository.save(user);
}


/* ============================= */
/* GET ADMIN PROFILE */
/* ============================= */

@GetMapping("/profile")
public PizzaUser getAdminProfile(Authentication authentication){

    // Get logged-in user's email from Spring Security
    String email = authentication.getName();

    // Fetch admin details using email
    return authService.getUserByEmail(email);

}

}