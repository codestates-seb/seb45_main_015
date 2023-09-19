package com.project15.server.rating.dto;

import lombok.Getter;
import lombok.Setter;

public class StarRatingDto {

    @Getter
    @Setter
    public static class PostDto {

        private Long item_id;

        private Long seller_id;

        private Long buyer_id;

        private int star;
    }

    @Getter
    @Setter
    public static class ResponseDto {

        private Long star_rating_id;

        private Long item_id;

        private Long seller_id;

        private Long buyer_id;

        private int star;
    }

    @Getter
    @Setter
    public static class AverageResponseDto {

        private Double star_rating_average;
    }
}
