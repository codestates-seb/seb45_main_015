package com.project15.server.item.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.time.LocalDateTime;

public class ItemDto {

    @Getter
    @Setter
    public static class PostDto {

        private String title;

        private String content;

        private String category;

        @Column
        @DateTimeFormat(pattern = "yy-MM-dd HH:mm:ss")
        private LocalDateTime expire_date;

        private long start_price;

        private long bid_unit;

        private boolean buy_now;

        private long buy_now_price;
    }
}
