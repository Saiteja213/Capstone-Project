package com.wipro.pizza_menu_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@EnableMethodSecurity
@SpringBootApplication
public class PizzaMenuServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PizzaMenuServiceApplication.class, args);
	}

}
