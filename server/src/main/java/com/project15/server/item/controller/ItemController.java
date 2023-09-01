package com.project15.server.item.controller;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.mapper.ItemMapper;
import com.project15.server.item.service.ItemServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/items")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ItemController {

    private final ItemMapper itemMapper;

    private final ItemServiceImpl itemService;

    @PostMapping
    public HttpStatus postItem(@RequestBody @Valid ItemDto.PostDto postDto) {
        Item item = itemMapper.postDtoToItem(postDto);

        itemService.createItem(item);

        return HttpStatus.CREATED;
    }

    @PostMapping("/{item-id}/images")
    public HttpStatus postImage(@PathVariable("item-id") Long itemId,
                                    @RequestPart(value = "image", required = false) List<MultipartFile> images) {

        itemService.createImage(itemId, images);

        return HttpStatus.CREATED;
    }

    @PatchMapping("/{item_id}")
    public HttpStatus patchItem(@PathVariable("item_id") Long itemId) {

        //TODO: ITEM STATUS 가 WAITING 일때만 PATCH 가능

        return HttpStatus.OK;
    }

    @DeleteMapping("/{item-id}/{member_id}")
    public HttpStatus deleteItem(@PathVariable("item-id") Long itemId,
                                 @PathVariable("member_id") Long memberId) {

        //TODO: ITEM STATUS 가 WAITING 일때만 DELETE 가능

        return HttpStatus.NO_CONTENT;
    }
}
