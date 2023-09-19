package com.project15.server.bid.service;

import com.project15.server.bid.entity.Bid;
import com.project15.server.item.dto.ItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface BidService {

    ItemDto.ResponseDto createBid(Bid bid, Long itemId);

    ItemDto.ResponseDto buyNow(Long buyerId, Long itemId);
}
