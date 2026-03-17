package com.wipro.pizza_auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication

public class PizzaAuthServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PizzaAuthServiceApplication.class, args);
	}

}
