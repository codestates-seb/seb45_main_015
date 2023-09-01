package com.project15.server.category.service;

import com.project15.server.category.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {

    void createCategory(String categoryName);

    Page<Category> findCategories(int pageNumber, int pageSize);

    Category findVerifiedCategory(Long categoryId);

    void updateCategory(Long categoryId, String newCategoryName);
}
