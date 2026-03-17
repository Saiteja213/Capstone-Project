package com.wipro.pizza_menu_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.pizza_menu_service.model.Category;
import com.wipro.pizza_menu_service.repository.CategoryRepository;
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category category){

        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        existing.setCategoryName(category.getCategoryName());

        return categoryRepository.save(existing);
    }

    public void deleteCategory(Long id){
        categoryRepository.deleteById(id);
    }
}