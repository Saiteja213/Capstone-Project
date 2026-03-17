package com.wipro.pizza_order_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="orders")
public class Order {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long orderId;

 private String userEmail;

 private double totalAmount;

 private String status;

 private LocalDateTime createdAt;
 
 
 /* Relationship with OrderItems */
 @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
 @JsonManagedReference
 private List<OrderItem> orderItems;
}