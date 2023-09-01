package com.project15.server.category.mapper;

import com.project15.server.category.dto.CategoryDto;
import com.project15.server.category.entity.Category;
import com.project15.server.utils.PageInfo;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {

    public CategoryDto.ResponseDto categoryToResponseDto(Category category) {
        if(category == null) {
            return null;
        }
        else {
            CategoryDto.ResponseDto responseDto = new CategoryDto.ResponseDto();
            responseDto.setId(category.getCategoryId());
            responseDto.setName(category.getName());

            return responseDto;
        }
    }

    public CategoryDto.MultiResponseDto categoriesToResponseDto(Page<Category> categoryPage) {
        if(categoryPage == null) {
            return null;
        }
        else {
            CategoryDto.MultiResponseDto responseDto = new CategoryDto.MultiResponseDto();

            List<CategoryDto.ResponseDto> categories = categoryPage.stream()
                    .map(this::categoryToResponseDto)
                    .collect(Collectors.toList());

            responseDto.setCategories(categories);
            responseDto.setPageInfo(
                    PageInfo
                    .builder()
                            .pageNumber(categoryPage.getNumber() + 1)
                            .pageSize(categoryPage.getSize())
                            .totalElements(categoryPage.getTotalElements())
                            .totalPages(categoryPage.getTotalPages())
                    .build()
            );

            return responseDto;
        }
    }
}
