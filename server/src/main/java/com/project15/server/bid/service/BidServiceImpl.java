package com.project15.server.bid.service;

import com.project15.server.bid.entity.Bid;
import com.project15.server.bid.repository.BidRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BidServiceImpl implements BidService {

    private final BidRepository bidRepository;

    @Override
    public void createBid(Bid bid) {
        //bidRepository 에서 요청 들어온 itemId로 찾은 findBid 객체의 bidPrice 가
        // 요청으로 들어온 bid.getBidPrice() 와 비교 후 item 의 bidUnit 을 적용하여 온 요청이면 save 되어야 함
    }
}
