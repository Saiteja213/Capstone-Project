package com.wipro.pizza_order_service.service;

import com.wipro.pizza_order_service.dto.OrderRequest;
import com.wipro.pizza_order_service.dto.OrderItemRequest;
import com.wipro.pizza_order_service.model.Order;
import com.wipro.pizza_order_service.model.OrderItem;
import com.wipro.pizza_order_service.repository.OrderRepository;
import com.wipro.pizza_order_service.repository.OrderItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;


    // ===============================
    // PLACE ORDER
    // ===============================

    public Order placeOrder(OrderRequest request){

        Order order = new Order();

        order.setUserEmail(request.getUserEmail());

        // When order is placed → waiting for admin approval
        order.setStatus("PENDING");

        order.setCreatedAt(LocalDateTime.now());

        double total = 0;

        // Calculate total price
        for(OrderItemRequest item : request.getItems()){
            total += item.getPrice() * item.getQuantity();
        }

        order.setTotalAmount(total);

        // Save order first
        Order savedOrder = orderRepository.save(order);


        // Save each item in OrderItems table
        for(OrderItemRequest item : request.getItems()){

            OrderItem orderItem = new OrderItem();

            orderItem.setMenuId(item.getMenuId());
            orderItem.setItemName(item.getName());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());

            // Link item to order
            orderItem.setOrder(savedOrder);

            orderItemRepository.save(orderItem);
        }

        return savedOrder;
    }



    // ===============================
    // CUSTOMER ORDER HISTORY
    // ===============================

    public List<Order> getOrdersByUser(String email){
        return orderRepository.findByUserEmail(email);
    }



    // ===============================
    // ADMIN ORDER MANAGEMENT
    // ===============================

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    // Get only pending orders
    public List<Order> getPendingOrders(){
        return orderRepository.findByStatus("PENDING");
    }


    // Update order status
    public Order updateOrderStatus(Long orderId, String status){

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }



    // ===============================
    // REPORT METHODS
    // ===============================

    public Double getDailySales(){
        return orderRepository.getDailySales();
    }

    public List<Object[]> getMonthlySales(){
        return orderRepository.getMonthlySales();
    }

    public Double getTotalRevenue(){
        return orderRepository.getTotalRevenue();
    }

    public List<Object[]> getOrderTrends(){
        return orderRepository.getOrderTrends();
    }

    public List<Object[]> getTopSellingPizza(){
        return orderItemRepository.getTopSellingPizza();
    }
}
