package com.project15.server.bid.dto;

import lombok.Getter;
import lombok.Setter;

public class BidDto {

    @Getter
    @Setter
    public static class PostDto {

        private Long item_id;

        private Long member_id;

        private int bid_price;
    }
}
