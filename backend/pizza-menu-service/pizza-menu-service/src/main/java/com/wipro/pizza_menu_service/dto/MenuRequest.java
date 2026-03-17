package com.wipro.pizza_menu_service.dto;



import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuRequest {

    private String name;
    private String description;
    private double price;
    private Long categoryId;

}
