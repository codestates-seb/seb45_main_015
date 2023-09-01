package com.project15.server.item.controller;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.mapper.ItemMapper;
import com.project15.server.item.service.ItemServiceImpl;
import com.project15.server.item.entity.ItemImage;
import com.project15.server.s3.service.S3ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
@CrossOrigin(value = "*")
@RequiredArgsConstructor
public class ItemController {

    private final ItemMapper itemMapper;

    private final ItemServiceImpl itemService;

    private final S3ServiceImpl s3Service;

    @PostMapping("/items")
    public ResponseEntity postItem(@RequestBody @Valid ItemDto.PostDto postDto) {
        Item item = itemMapper.postDtoToItem(postDto);

        item = itemService.createItem(item);

        ItemDto.IdResponseDto responseDto = new ItemDto.IdResponseDto();
        responseDto.setItem_id(item.getItemId());

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PostMapping("/item-images/{item-id}")
    public ResponseEntity postImage(@PathVariable("item-id") Long itemId,
                                    @RequestPart(value = "image", required = false) List<MultipartFile> images) {
        List<String> urlList = images.stream().map(s3Service::uploadFileToS3).collect(Collectors.toList());

        itemService.createImage(itemId, images, urlList);

        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @PatchMapping("/items/{item_id}")
    public ResponseEntity patchItem(@PathVariable("item_id") Long itemId) {

        //TODO: 경매가 시작되고 판매자가 작성한 글의 내용을 수정하지 못하게 해야하나?

        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
