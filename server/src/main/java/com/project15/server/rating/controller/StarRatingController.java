package com.project15.server.rating.controller;

import com.amazonaws.Response;
import com.project15.server.rating.dto.StarRatingDto;
import com.project15.server.rating.entity.StarRating;
import com.project15.server.rating.mapper.StarRatingMapper;
import com.project15.server.rating.repository.StarRatingRepository;
import com.project15.server.rating.service.StarRatingServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ratings")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class StarRatingController {

    private final StarRatingMapper starRatingMapper;

    private final StarRatingServiceImpl starRatingService;

    @PostMapping
    public ResponseEntity postStarRating(@RequestBody StarRatingDto.PostDto postDto) {

        StarRating starRating = starRatingMapper.postToStarRating(postDto);

        StarRating savedStarRating = starRatingService.createStarRating(starRating);

        StarRatingDto.ResponseDto responseDto = starRatingMapper.starRatingToResponse(savedStarRating);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity getAverageStarRating(@RequestParam("member_id") Long memberId) {

        Double averageStar = starRatingService.findAverageStarRating(memberId);

        StarRatingDto.AverageResponseDto responseDto = starRatingMapper.averageStarToAverageStarResponse(averageStar);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
