package com.project15.server.rating.service;

import com.project15.server.exception.ExceptionCode;
import com.project15.server.exception.GlobalException;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemStatus;
import com.project15.server.item.service.ItemServiceImpl;
import com.project15.server.rating.entity.StarRating;
import com.project15.server.rating.repository.StarRatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StarRatingServiceImpl implements StarRatingService {

    private final StarRatingRepository starRatingRepository;

    private final ItemServiceImpl itemService;

    @Override
    public StarRating createStarRating(StarRating starRating) {
        Item findItem = itemService.findVerifiedItem(starRating.getItem().getItemId());

        if(!findItem.getStatus().equals(ItemStatus.CLOSED)) {
            throw new GlobalException(ExceptionCode.NOT_IN_CLOSED);
        }

        if(!isCorrectSellerAndBuyer(findItem, starRating.getSeller().getMemberId(), starRating.getBuyer().getMemberId())) {
            throw new GlobalException(ExceptionCode.SELLER_OR_BUYER_MISS_MATCH);
        }

        if(starRatingRepository.findByItemItemId(starRating.getItem().getItemId()).isPresent()) {
            throw new GlobalException(ExceptionCode.STAR_RATING_EXIST);
        }

        return starRatingRepository.save(starRating);
    }

    @Override
    public Double findAverageStarRating(Long memberId) {
        Double averageStar = starRatingRepository.findAverageStar(memberId)
                .orElseThrow(() -> new GlobalException(ExceptionCode.STAR_RATING_NOT_FOUND));

        return averageStar;
    }

    private boolean isCorrectSellerAndBuyer(Item item, Long sellerId, Long buyerId) {
        if(item.getSeller().getMemberId().equals(sellerId) && item.getBuyer().getMemberId().equals(buyerId)) {
            return true;
        }

        return false;
    }
}
