package com.project15.server.item.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ItemDto {

    @Getter
    @Setter
    public static class PostDto {

        private Long member_id;

        private String title;

        private String content;

        private Long category_id;

        private int auction_time;

        private int start_price;

        private int bid_unit;

        private Integer buy_now_price;
    }

    @Getter
    @Setter
    public static class ResponseDto {
        //TODO: Response 정해지면 dto 작성 예정
    }
}
