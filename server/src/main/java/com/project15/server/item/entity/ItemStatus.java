package com.project15.server.item.entity;

public enum ItemStatus {
    //TODO: 경매의 상태 전환 로직 추가해야함

    //경매 대기중
    WAITING,

    //경매 진행중
    BIDDING,

    //경매 종료(낙찰) & 거래중
    TRADING,

    //유찰
    FAILED,

    //거래완료
    CLOSED
}
