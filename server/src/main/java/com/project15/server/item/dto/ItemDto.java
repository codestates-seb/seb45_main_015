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

        private long member_id;

        private String title;

        private String content;

        private String category;

        private int expire_date;

        private int start_price;

        private int bid_unit;

        private String buy_now;

        private int buy_now_price;
    }

    @Getter
    @Setter
    public static class ResponseDto {
        //TODO: Response 정해지면 dto 작성 예정
    }
}
