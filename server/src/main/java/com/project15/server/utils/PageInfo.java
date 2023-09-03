package com.project15.server.utils;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PageInfo {

    private int page_number;

    private int page_size;

    private long total_elements;

    private int total_pages;
}
