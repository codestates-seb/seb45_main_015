package com.project15.server.wish.controller;

import com.project15.server.item.entity.Item;
import com.project15.server.wish.dto.WishDto;
import com.project15.server.wish.entity.Wish;
import com.project15.server.wish.mapper.WishMapper;
import com.project15.server.wish.service.WishServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class WishController {

    private final WishServiceImpl wishService;

    private final WishMapper wishMapper;

    @PostMapping("/items/{item-id}/wishes/{member-id}")
    public HttpStatus postWish(@PathVariable("item-id") Long itemId,
                               @PathVariable("member-id") Long memberId) {
        Wish wish = wishMapper.postToWish(itemId, memberId);
        wishService.createWish(wish);

        return HttpStatus.OK;
    }

    @DeleteMapping("/members/{member-id}/wishes")
    public HttpStatus deleteWish(@PathVariable("member-id") Long memberId,
                                 @RequestBody List<Long> itemIds) {
        wishService.removeWishes(memberId, itemIds);
        return HttpStatus.NO_CONTENT;
    }

    @GetMapping("/members/{member-id}/wishes")
    public ResponseEntity getWishes(@PathVariable("member-id") Long memberId,
                                    @RequestParam("page_number") int pageNumber,
                                    @RequestParam("page_size") int pageSize){
        Page<Wish> wishPage = wishService.findWishes(pageNumber, pageSize, memberId);

        WishDto.MultiResponseDto responseDto = wishMapper.wishPageAndItemsToMultiResponseDto(wishPage);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
