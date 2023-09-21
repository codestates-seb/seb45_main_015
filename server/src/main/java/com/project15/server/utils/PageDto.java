package com.project15.server.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageDto {

    private int page_number;

    private int page_size;

    private Long watcher_id;

    private Long category_id;

    private String keyword;

    private String item_status;

    private Long seller_id;
}
