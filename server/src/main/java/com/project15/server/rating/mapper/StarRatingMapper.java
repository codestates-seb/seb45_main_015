package com.project15.server.rating.mapper;

import com.project15.server.rating.dto.StarRatingDto;
import com.project15.server.rating.entity.StarRating;
import org.springframework.stereotype.Component;

@Component
public class StarRatingMapper {

    public StarRating postToStarRating(StarRatingDto.PostDto postDto) {
        if(postDto == null) {
            return null;
        }
        else {
            StarRating starRating = new StarRating();
            starRating.setItem(postDto.getItem_id());
            starRating.setSeller(postDto.getSeller_id());
            starRating.setBuyer(postDto.getBuyer_id());
            starRating.setStar(postDto.getStar());

            return starRating;
        }
    }

    public StarRatingDto.ResponseDto starRatingToResponse(StarRating starRating) {
        if(starRating == null) {
            return null;
        }
        else {
            StarRatingDto.ResponseDto responseDto = new StarRatingDto.ResponseDto();
            responseDto.setStar_rating_id(starRating.getStarRatingId());
            responseDto.setItem_id(starRating.getItem().getItemId());
            responseDto.setSeller_id(starRating.getSeller().getMemberId());
            responseDto.setBuyer_id(starRating.getBuyer().getMemberId());
            responseDto.setStar(starRating.getStar());

            return responseDto;
        }
    }

    public StarRatingDto.AverageResponseDto averageStarToAverageStarResponse(Double averageStar) {
        if(averageStar == null) {
            return null;
        }
        else {
            StarRatingDto.AverageResponseDto responseDto = new StarRatingDto.AverageResponseDto();
            responseDto.setStar_rating_average(averageStar);

            return responseDto;
        }
    }
}
