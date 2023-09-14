package com.project15.server.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class PageDto<T> {

    private int pageNumber;

    private int pageSize;

    public Pageable createPageable() {
         return PageRequest.of(pageNumber - 1, pageSize, Sort.by("CreatedAt").descending());
    }
}
