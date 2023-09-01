package com.project15.server.bid.controller;

import com.project15.server.bid.dto.BidDto;
import com.project15.server.bid.entity.Bid;
import com.project15.server.bid.mapper.BidMapper;
import com.project15.server.bid.service.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(value = "*")
@RequiredArgsConstructor
public class BidController {

    private final BidMapper bidMapper;

    private final BidService bidService;

    @PostMapping("/bid/{item_id}")
    public ResponseEntity postBid(@PathVariable("item_id") long itemId,
                                  @RequestBody BidDto.PostDto postDto) {
        Bid bid = bidMapper.postToBid(postDto);

        bid = bidService.createBid(bid);

        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }
}
