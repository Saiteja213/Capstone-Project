package com.wipro.pizza_order_service.security;

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

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {

    	String header = request.getHeader("Authorization");

    	if (header != null && header.startsWith("Bearer ")) {

    	    String token = header.substring(7).trim();

    	    try {

    	        // check token format first
    	        if(token.split("\\.").length != 3){
    	            System.out.println("Invalid token format: " + token);
    	            filterChain.doFilter(request, response);
    	            return;
    	        }

    	        String email = jwtUtil.extractUsername(token);
    	        String role = jwtUtil.extractRole(token);

    	        List<SimpleGrantedAuthority> authorities =
    	                List.of(new SimpleGrantedAuthority("ROLE_" + role));

    	        UsernamePasswordAuthenticationToken auth =
    	                new UsernamePasswordAuthenticationToken(email, null, authorities);

    	        SecurityContextHolder.getContext().setAuthentication(auth);

    	    } catch (Exception e) {
    	        System.out.println("Invalid JWT: " + e.getMessage());
    	    }
    	}

    	filterChain.doFilter(request, response);
    }}
