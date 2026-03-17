package com.wipro.pizza_menu_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.pizza_menu_service.dto.MenuRequest;
import com.wipro.pizza_menu_service.model.Category;
import com.wipro.pizza_menu_service.model.MenuItem;
import com.wipro.pizza_menu_service.repository.CategoryRepository;
import com.wipro.pizza_menu_service.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<MenuItem> getAllMenuItems(){
        return menuRepository.findAll();
    }

    public MenuItem addMenuItem(MenuRequest request){

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        MenuItem item = new MenuItem();

        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        item.setCategory(category);

        return menuRepository.save(item);
    }

    public void deleteMenuItem(Long id){
        menuRepository.deleteById(id);
    }
    public MenuItem updateMenuItem(Long id, MenuRequest request){

        MenuItem menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found"));

        menu.setName(request.getName());
        menu.setDescription(request.getDescription());
        menu.setPrice(request.getPrice());

        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow();

        menu.setCategory(category);

        return menuRepository.save(menu);
    }
}
