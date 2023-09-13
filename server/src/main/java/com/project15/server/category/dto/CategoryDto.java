package com.project15.server.category.dto;

import com.project15.server.utils.PageInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


public class CategoryDto {

    @Getter
    @Setter
    public static class ResponseDto {
        private Long id;

        private String name;
    }

    @Getter
    @Setter
    public static class MultiResponseDto {

        private List<CategoryDto.ResponseDto> categories;

        private PageInfo page_info;
    }
}
