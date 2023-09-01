package com.project15.server.item.entity;

public enum ItemStatus {
    //경매 대기중
    WAITING,

    //경매 진행중
    BIDDING,

    //경매 종료(낙찰) & 거래중
    TRADING,

    //유찰
    FAILED,

    //거래완료
    COMPLETE
}
