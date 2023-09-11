package com.project15.server.wish.dto;

import com.project15.server.utils.PageInfo;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.util.List;

public class WishDto {

    @Getter
    @Setter
    public static class ResponseDto {

        private Long wish_id;

        private Long item_id;

        private Long seller_id;

        private String seller_nickname;

        private Long buyer_id;

        private String buyer_nickname;

        private String status;

        private String title;

        private String content;

        private String end_time;

        private String category;

        private List<String> item_image_urls;

        private int start_price;

        private int bid_unit;

        private int current_price;

        private int buy_now_price;
    }

    @Getter
    @Setter
    public static class MultiResponseDto {

        private List<ResponseDto> wishes;

        private PageInfo page_info;
    }
}