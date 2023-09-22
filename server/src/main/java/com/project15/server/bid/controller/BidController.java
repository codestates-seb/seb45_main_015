package com.project15.server.bid.controller;

import com.project15.server.bid.dto.BidDto;
import com.project15.server.bid.entity.Bid;
import com.project15.server.bid.mapper.BidMapper;
import com.project15.server.bid.service.BidService;
import com.project15.server.bid.service.BidServiceImpl;
import com.project15.server.item.dto.ItemDto;
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

    //나의 거래 페이지에서 내가 입찰한 물품의 전체 목록
    @GetMapping("/items/my-item/bids")
    public ResponseEntity getMyBids(@RequestParam("page_number") int pageNumber,
                                    @RequestParam("page_size") int pageSize,
                                    @RequestParam("buyer_id") Long buyerId) {
        ItemDto.MultiResponseDto multiResponseDto = bidService.findMyBids(pageNumber, pageSize, buyerId);

        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }
}
