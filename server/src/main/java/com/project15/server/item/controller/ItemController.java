package com.project15.server.item.controller;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.mapper.ItemMapper;
import com.project15.server.item.service.ItemServiceImpl;
import com.project15.server.item.entity.ItemImage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(value = "*")
@RequiredArgsConstructor
public class ItemController {

    private final ItemMapper itemMapper;

    private final ItemServiceImpl itemService;

    @PostMapping("/items")
    public ResponseEntity postItem(@RequestPart(value = "item_data") ItemDto.PostDto postDto,
                                   @RequestPart(value = "image", required = false) List<MultipartFile> files) {
        Item item = itemMapper.postDtoToItem(postDto);

        if(files == null) {
            itemService.createItem(item);
        }
        else {
            item = itemService.createItem(item, files);
        }

        //TODO: Response 정해지면 dto 작성 예정

        return new ResponseEntity<>(item.getItemId(), HttpStatus.OK);
    }
}
