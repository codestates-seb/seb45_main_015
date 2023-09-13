package com.project15.server.category.controller;

import com.project15.server.category.dto.CategoryDto;
import com.project15.server.category.entity.Category;
import com.project15.server.category.mapper.CategoryMapper;
import com.project15.server.category.service.CategoryServiceImpl;
import com.project15.server.member.repository.TokenBlacklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryMapper categoryMapper;

    private final CategoryServiceImpl categoryService;

    //ADMIN ROLE 만 접근 가능
    @PostMapping
    public HttpStatus postCategory(@RequestParam("category_name") String categoryName) {
        categoryService.createCategory(categoryName);

        return HttpStatus.CREATED;
    }

    @GetMapping
    public ResponseEntity getCategories(@RequestParam("page_number") int pageNumber,
                                        @RequestParam("page_size") int pageSize) {
        Page<Category> categories = categoryService.findCategories(pageNumber, pageSize);

        CategoryDto.MultiResponseDto responseDto = categoryMapper.categoriesToResponseDto(categories);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //ADMIN ROLE 만 접근 가능
    @PatchMapping("/{category-id}")
    public HttpStatus patchCategory(@PathVariable("category-id") Long categoryId,
                                    @RequestParam("new_category_name") String newCategoryName) {
        categoryService.updateCategory(categoryId, newCategoryName);

        return HttpStatus.OK;
    }
}
