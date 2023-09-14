package com.project15.server.item.dto;

import com.project15.server.utils.PageInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ItemDto {

    @Getter
    @Setter
    public static class PostDto {

        private Long seller_id;

        private String title;

        private String content;

        private Long category_id;

        private int end_time;

        private int start_price;

        private int bid_unit;

        private Integer buy_now_price;
    }

    @Getter
    @Setter
    public static class MultiResponseDto {

        private List<ResponseDto> items;

        private PageInfo page_info;
    }

    @Getter
    @Setter
    public static class ResponseDto {

        private Long seller_id;

        private String seller_nickname;

        private Long buyer_id;

        private String buyer_nickname;

        private Long item_id;

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

        private boolean inWishList;
    }

    @Getter
    @Setter
    public static class PatchDto {

        private Long item_id;

        private Long seller_id;

        private String title;

        private String content;

        private Long category_id;

        private Integer end_time;

        private Integer start_price;

        private Integer bid_unit;

        private Integer buy_now_price;
    }

    @Getter
    @Setter
    public static class DeleteImageDto {

        private Long item_id;

        private Long seller_id;

        @NotEmpty
        private List<String> delete_image_urls;
    }

    @Getter
    @Setter
    public static class DeleteItemDto {

        private Long item_id;

        private Long seller_id;
    }
}
