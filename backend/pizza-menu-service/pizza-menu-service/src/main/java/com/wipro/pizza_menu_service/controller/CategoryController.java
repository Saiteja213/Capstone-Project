package com.wipro.pizza_menu_service.controller;

import com.wipro.pizza_menu_service.model.Category;
import com.wipro.pizza_menu_service.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
//@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // PUBLIC - Everyone can view categories
    @GetMapping
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    // ADMIN ONLY - Add category
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Category addCategory(@RequestBody Category category){

        if(category.getCategoryName()==null || category.getCategoryName().trim().isEmpty()){
            throw new RuntimeException("Category name cannot be empty");
        }

        return categoryService.addCategory(category);
    }

    // ADMIN ONLY - Update category
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id,@RequestBody Category category){
        return categoryService.updateCategory(id, category);
    }

    // ADMIN ONLY - Delete category
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
    }
}