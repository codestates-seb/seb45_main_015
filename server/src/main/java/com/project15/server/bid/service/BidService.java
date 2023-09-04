package com.project15.server.bid.service;

import com.project15.server.bid.entity.Bid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface BidService {

    void createBid(Bid bid);
}
