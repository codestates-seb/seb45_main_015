package com.project15.server.item.controller;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.mapper.ItemMapper;
import com.project15.server.item.service.ItemServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

        itemService.createItem(item, postDto.getEnd_time());

        return HttpStatus.CREATED;
    }

    @PostMapping("/{item-id}/images")
    public HttpStatus postImage(@PathVariable("item-id") Long itemId,
                                @RequestPart(value = "image", required = false) List<MultipartFile> images) {

        itemService.createImage(itemId, images);

        return HttpStatus.CREATED;
    }

    @GetMapping("/{item-id}")
    public ResponseEntity getItem(@PathVariable("item-id") Long itemId) {
        Item item = itemService.findItem(itemId);

        ItemDto.SingleResponseDto responseDto = itemMapper.itemToSingleResponseDto(item);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity getItems(@RequestParam("page_number") int pageNumber,
                                   @RequestParam("page_size") int pageSize,
                                   @RequestParam("category_id") Long categoryId) {
        Page<Item> itemPage = itemService.findItems(pageNumber, pageSize, categoryId);

        ItemDto.MultiResponseDto multiResponseDto = itemMapper.itemPageToMultiResponseDto(itemPage);

        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getItems(@RequestParam("page_number") int pageNumber,
                                   @RequestParam("page_size") int pageSize) {
        Page<Item> itemPage = itemService.findItems(pageNumber, pageSize);

        ItemDto.MultiResponseDto multiResponseDto = itemMapper.itemPageToMultiResponseDto(itemPage);

        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    @PatchMapping
    public HttpStatus patchItem(@RequestBody ItemDto.PatchDto patchDto) {

        //TODO: ITEM STATUS 가 WAITING 일때만 PATCH 가능

        itemService.updateItem(patchDto);

        return HttpStatus.OK;
    }

    @DeleteMapping("/{item-id}/{member-id}/images")
    public HttpStatus patchImage(@PathVariable("item-id") Long itemId,
                                 @PathVariable("member-id") Long memberId,
                                 @RequestParam("delete_") List<String> deleteImageUrls) {

        //TODO: ITEM STATUS 가 WAITING 일때만 PATCH 가능
        itemService.removeImage(itemId, memberId, deleteImageUrls);

        return HttpStatus.NO_CONTENT;
    }

    @DeleteMapping("/{item-id}/{member-id}")
    public HttpStatus deleteItem(@PathVariable("item-id") Long itemId,
                                 @PathVariable("member-id") Long memberId) {

        //TODO: ITEM STATUS 가 WAITING 일때만 DELETE 가능

        return HttpStatus.NO_CONTENT;
    }
}
