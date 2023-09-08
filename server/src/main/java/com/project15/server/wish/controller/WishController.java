package com.project15.server.wish.controller;

import com.project15.server.wish.service.WishService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class WishController {

    private final WishService wishService;

    @PostMapping("/items/wishes")
    public HttpStatus postWish() {

        return HttpStatus.OK;
    }
}
