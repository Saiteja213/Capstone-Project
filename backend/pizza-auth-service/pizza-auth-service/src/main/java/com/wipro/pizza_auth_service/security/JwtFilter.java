package com.wipro.pizza_auth_service.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component // Registers this filter as a Spring component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // Utility class used to extract data from JWT token

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {

        String path = request.getServletPath();

        // Skip authentication endpoints like login and register
        if(path.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Get Authorization header from request
        String header = request.getHeader("Authorization");

        if(header != null && header.startsWith("Bearer ")){

            // Extract token from header
            String token = header.substring(7);

            // Extract user details stored inside the JWT
            String email = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);

            // Convert role into Spring Security authority
            List<SimpleGrantedAuthority> authorities =
                    List.of(new SimpleGrantedAuthority("ROLE_" + role));

            // Create authentication object for the user
            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(email,null,authorities);

            // Attach request details to authentication
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Store authentication in Security Context
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // Continue the filter chain
        filterChain.doFilter(request,response);
    }
}