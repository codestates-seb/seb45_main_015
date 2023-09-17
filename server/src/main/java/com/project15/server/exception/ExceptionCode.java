package com.project15.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND("MEMBER_NOT_FOUND", 404),
    ITEM_NOT_FOUND("ITEM_NOT_FOUND", 404),
    IMAGE_NOT_FOUND("IMAGE_NOT_FOUND", 404),
    BID_NOT_FOUND("BID_NOT_FOUND", 404),
    CHAT_ROOM_NOT_FOUND("CHAT_ROOM_NOT_FOUND", 404),
    MESSAGE_NOT_FOUND("MESSAGE_NOT_FOUND", 404),
    CATEGORY_NOT_FOUND("CATEGORY_NOT_FOUND", 404),
    WISH_NOT_FOUND("WISH_NOT_FOUND", 404),
    MEMBER_EXISTS("MEMBER_EXISTS", 403),
    ITEM_EXISTS("ITEM_EXISTS", 403),
    IMAGE_EXISTS("ITEM_EXISTS", 403),
    BID_EXISTS("BID_EXISTS", 403),
    CHAT_ROOM_EXISTS("CHAT_ROOM_EXISTS", 403),
    MESSAGE_EXISTS("MESSAGE_EXISTS", 403),
    CATEGORY_EXISTS("CATEGORY_EXISTS", 403),
    STATUS_EXIST("STATUS_EXIST", 403),
    WISH_EXIST("WISH_EXIST", 403),
    IMAGE_UPLOAD_FAIL("IMAGE_UPLOAD_FAIL", 400),
    SELLER_MISS_MATCH("SELLER_MISS_MATCH", 400),
    BID_UNIT_INVALID("BID_UNIT_INVALID", 400),
    SELLER_CAN_NOT_BIDDING("SELLER_CAN_NOT_BIDDING", 400),
    BUY_NOW_UNAVAILABLE("BUY_NOW_UNAVAILABLE", 400),
    NOT_ON_AUCTION("NOT_ON_AUCTION", 400),
    NOT_IN_WAITING("NOT_IN_WAITING", 400);

    private String message;

    private int statusNum;

    ExceptionCode(String message, int statusNum) {
        this.message = message;
        this.statusNum = statusNum;
    }

    public String getMessage() {
        return message;
    }

    public int getStatusNum() {
        return statusNum;
    }
}
