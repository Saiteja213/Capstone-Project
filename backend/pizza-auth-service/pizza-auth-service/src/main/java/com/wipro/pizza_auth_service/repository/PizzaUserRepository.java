package com.wipro.pizza_auth_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.pizza_auth_service.model.PizzaUser;

public interface PizzaUserRepository extends JpaRepository<PizzaUser, Long>{
	
	Optional<PizzaUser> findByEmail(String email);

}
