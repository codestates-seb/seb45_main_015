package com.project15.server.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project15.server.member.repository.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GuestController {

    private final AuthService authService;

    @PostMapping("/guest-login")
    public ResponseEntity<String> guestLogin() {
        String token = authService.guestLogin();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse;
        try {
            jsonResponse = objectMapper.writeValueAsString(Collections.singletonMap("token", token));
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("Failed to serialize JSON response", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + token);

        return new ResponseEntity<>(jsonResponse, httpHeaders, HttpStatus.OK);
    }
}
