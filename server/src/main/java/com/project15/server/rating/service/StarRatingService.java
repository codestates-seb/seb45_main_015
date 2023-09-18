package com.project15.server.rating.service;

import com.project15.server.rating.entity.StarRating;
import org.springframework.stereotype.Service;

@Service
public interface StarRatingService {

    StarRating createStarRating(StarRating starRating);

    Double findAverageStarRating(Long memberId);
}
