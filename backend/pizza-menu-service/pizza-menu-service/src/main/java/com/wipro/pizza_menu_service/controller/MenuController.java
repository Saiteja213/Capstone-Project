package com.wipro.pizza_menu_service.controller;

import com.wipro.pizza_menu_service.dto.MenuRequest;
import com.wipro.pizza_menu_service.model.MenuItem;
import com.wipro.pizza_menu_service.service.MenuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
//@CrossOrigin(origins = "http://localhost:5173")
public class MenuController {

    @Autowired
    private MenuService menuService;

    // PUBLIC - Everyone can view menu
    @GetMapping
    public List<MenuItem> getAllMenuItems(){
        return menuService.getAllMenuItems();
    }

    // ADMIN ONLY - Add pizza
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public MenuItem addMenuItem(@RequestBody MenuRequest request){
        return menuService.addMenuItem(request);
    }

    // ADMIN ONLY - Delete pizza
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteMenuItem(@PathVariable Long id){
        menuService.deleteMenuItem(id);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable Long id,
                                   @RequestBody MenuRequest request){
        return menuService.updateMenuItem(id, request);
    }
}
