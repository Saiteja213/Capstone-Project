package com.wipro.pizza_order_service.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {

    private String userEmail;

    private List<OrderItemRequest> items;
}
