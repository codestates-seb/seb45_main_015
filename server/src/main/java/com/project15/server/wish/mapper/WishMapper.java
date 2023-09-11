package com.project15.server.wish.mapper;

import com.project15.server.item.entity.ItemImage;
import com.project15.server.utils.PageInfo;
import com.project15.server.wish.dto.WishDto;
import com.project15.server.wish.entity.Wish;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class WishMapper {

    public Wish postToWish(Long itemId, Long memberId) {
        if(itemId == null || memberId == null) {
            return null;
        }
        else {
            Wish wish = new Wish();
            wish.setMember(memberId);
            wish.setItem(itemId);

            return wish;
        }
    }

    public WishDto.MultiResponseDto wishPageAndItemsToMultiResponseDto(Page<Wish> wishPage) {
        if(wishPage == null) {
            return null;
        }
        else {
            WishDto.MultiResponseDto multiResponseDto = new WishDto.MultiResponseDto();

            List<Wish> wishes = wishPage.getContent();

            List<WishDto.ResponseDto> responseDtos = wishes
                    .stream()
                    .map(this::wishItemToResponseDto)
                    .collect(Collectors.toList());

            multiResponseDto.setWishes(responseDtos);

            multiResponseDto.setPage_info(
                    PageInfo.builder()
                            .page_number(wishPage.getNumber() + 1)
                            .page_size(wishPage.getSize())
                            .total_elements(wishPage.getTotalElements())
                            .total_pages(wishPage.getTotalPages())
                            .build()
            );

            return multiResponseDto;
        }
    }

    public WishDto.ResponseDto wishItemToResponseDto(Wish wish) {
        if(wish == null) {
            return null;
        }
        else {
            WishDto.ResponseDto responseDto = new WishDto.ResponseDto();
            responseDto.setWish_id(wish.getWishId());
            responseDto.setItem_id(wish.getItem().getItemId());
            responseDto.setSeller_id(wish.getItem().getSeller().getMemberId());
            responseDto.setSeller_nickname(wish.getItem().getSeller().getNickname());
            if(wish.getItem().getBuyer() != null) {
                responseDto.setBuyer_id(wish.getItem().getBuyer().getMemberId());
                responseDto.setBuyer_nickname(wish.getItem().getBuyer().getNickname());
            }
            responseDto.setStatus(wish.getItem().getStatus().name());
            responseDto.setTitle(wish.getItem().getTitle());
            responseDto.setContent(wish.getItem().getContent());
            String endTimeString = wish.getItem().getEndTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            responseDto.setEnd_time(endTimeString);
            responseDto.setCategory(wish.getItem().getCategory().getName());
            responseDto.setItem_image_urls(wish.getItem().getItemImages()
                    .stream()
                    .map(ItemImage::getImageUrl)
                    .collect(Collectors.toList())
            );
            responseDto.setStart_price(wish.getItem().getStartPrice());
            responseDto.setBid_unit(wish.getItem().getBidUnit());
            responseDto.setCurrent_price(wish.getItem().getCurrentPrice());
            responseDto.setBuy_now_price(wish.getItem().getBuyNowPrice());

            return responseDto;
        }
    }
}
