package com.wipro.pizza_order_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wipro.pizza_order_service.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
	 @Query("SELECT oi.menuId, SUM(oi.quantity) " +
	           "FROM OrderItem oi " +
	           "GROUP BY oi.menuId " +
	           "ORDER BY SUM(oi.quantity) DESC")
	    List<Object[]> getTopSellingPizza();

}
