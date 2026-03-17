package com.wipro.pizza_menu_service.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.pizza_menu_service.model.MenuItem;

public interface MenuRepository extends JpaRepository<MenuItem, Long>{
	

}
