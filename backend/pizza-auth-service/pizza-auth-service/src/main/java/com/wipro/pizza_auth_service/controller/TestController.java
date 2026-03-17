package com.wipro.pizza_auth_service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String secureTest(){
        return "JWT Protection Working";
    }

}
