package com.wipro.pizza_order_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wipro.pizza_order_service.model.Order;


public interface OrderRepository extends JpaRepository<Order, Long> {

    // Get orders of a specific user
    List<Order> findByUserEmail(String userEmail);

    // Get orders by status (PENDING / PREPARING / REJECTED etc.)
    List<Order> findByStatus(String status);


    // =========================
    // REPORT QUERIES
    // =========================

    // Daily Sales
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE DATE(o.createdAt) = CURRENT_DATE")
    Double getDailySales();

    // Monthly Sales
    @Query("SELECT MONTH(o.createdAt), SUM(o.totalAmount) FROM Order o GROUP BY MONTH(o.createdAt)")
    List<Object[]> getMonthlySales();

    // Total Revenue
    @Query("SELECT SUM(o.totalAmount) FROM Order o")
    Double getTotalRevenue();

    // Order Trends (orders per day)
    @Query("SELECT DATE(o.createdAt), COUNT(o.orderId) FROM Order o GROUP BY DATE(o.createdAt)")
    List<Object[]> getOrderTrends();
}
