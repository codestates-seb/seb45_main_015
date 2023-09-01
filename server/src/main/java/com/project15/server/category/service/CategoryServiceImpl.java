package com.project15.server.category.service;

import com.project15.server.category.entity.Category;
import com.project15.server.category.repository.CategoryRepository;
import com.project15.server.exception.ExceptionCode;
import com.project15.server.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public void createCategory(String categoryName) {
        verifyExistCategory(categoryName);

        Category category = new Category();
        category.setName(categoryName);

        categoryRepository.save(category);
    }

    @Override
    public Page<Category> findCategories(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("name"));
        Page<Category> categoryPage = categoryRepository.findAll(pageable);
        return categoryPage;
    }

    private void verifyExistCategory(String categoryName) {
        if(categoryRepository.findByName(categoryName).isPresent()) {
            throw new GlobalException(ExceptionCode.CATEGORY_EXISTS);
        }
    }

    @Override
    public Category findVerifiedCategory(Long categoryId) {
        Category category = categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new GlobalException(ExceptionCode.CATEGORY_NOT_FOUND));

        return category;
    }

    @Override
    public void updateCategory(Long categoryId, String newCategoryName) {
        verifyExistCategory(newCategoryName);
        Category findCategory = findVerifiedCategory(categoryId);
        findCategory.setName(newCategoryName);
    }
}
