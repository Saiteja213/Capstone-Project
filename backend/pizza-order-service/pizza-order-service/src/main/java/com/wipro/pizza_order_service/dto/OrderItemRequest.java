package com.wipro.pizza_order_service.dto;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long menuId;
    private String name;

    private int quantity;

    private double price;
}
