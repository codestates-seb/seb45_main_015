package com.project15.server.item.controller;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.mapper.ItemMapper;
import com.project15.server.item.service.ItemServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping
@CrossOrigin(value = "*")
@RequiredArgsConstructor
public class ItemController {

    private final ItemMapper itemMapper;

    private final ItemServiceImpl itemService;

    @PostMapping("/items")
    public ResponseEntity postItem(@Valid @RequestBody ItemDto.PostDto postDto) {

        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
