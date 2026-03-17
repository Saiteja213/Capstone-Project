package com.wipro.pizza_order_service.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="order_items")
public class OrderItem {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private Long menuId;
   
 private String itemName; 
 private int quantity;

 private double price;

 @ManyToOne
 @JoinColumn(name="order_id")
 @JsonBackReference
 private Order order;
}
