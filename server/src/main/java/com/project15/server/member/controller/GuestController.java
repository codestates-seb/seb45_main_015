package com.project15.server.member.controller;

import com.project15.server.member.repository.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GuestController {

    @Autowired
    private AuthService authService;

    @PostMapping("/guest-login")
    public ResponseEntity<String> guestLogin() {
        String token = authService.guestLogin();
        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}
