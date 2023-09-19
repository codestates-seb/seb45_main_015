package com.project15.server.bid.controller;

import com.project15.server.bid.dto.BidDto;
import com.project15.server.bid.entity.Bid;
import com.project15.server.bid.mapper.BidMapper;
import com.project15.server.bid.service.BidService;
import com.project15.server.bid.service.BidServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class BidController {

    private final BidMapper bidMapper;

    private final BidServiceImpl bidService;

    @PostMapping("/items/bids")
    public HttpStatus postBid(@RequestBody BidDto.PostDto postDto) {
        Bid bid = bidMapper.postToBid(postDto);

        bidService.createBid(bid, bid.getItem().getItemId());

        return HttpStatus.CREATED;
    }

    @PostMapping("/items/buy-now")
    public HttpStatus postBuyNow(@RequestBody BidDto.PostDto postDto) {
        bidService.buyNow(postDto.getBuyer_id(), postDto.getItem_id());

        return HttpStatus.OK;
    }
}
