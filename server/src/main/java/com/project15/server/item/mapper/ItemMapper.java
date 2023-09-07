package com.project15.server.item.mapper;

import com.project15.server.category.entity.Category;
import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
import com.project15.server.member.Member;
import com.project15.server.utils.PageInfo;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ItemMapper {

    public Item postDtoToItem(ItemDto.PostDto postDto) {
        if(postDto == null) {
            return null;
        }
        else {
            Item item = new Item();
            item.setTitle(postDto.getTitle());
            item.setContent(postDto.getContent());
            item.setCategory(postDto.getCategory_id());
            item.setStartPrice(postDto.getStart_price());
            item.setBidUnit(postDto.getBid_unit());
            item.setStartPrice(postDto.getStart_price());
            item.setBuyNowPrice(postDto.getBuy_now_price());
            //TODO: MEMBER 구현 후 주석 해제
//            item.setMember(postDto.getMemberId);

            return item;
        }
    }

    public ItemImage fileToItemImage(MultipartFile file, Long itemId, List<String> urlList) {
        if(file == null) {
            return null;
        }
        else {
            ItemImage itemImage = new ItemImage();
            itemImage.setImageName(file.getOriginalFilename());
            itemImage.setImageType(file.getContentType());
            if(urlList.size() != 0) {
                itemImage.setImageUrl(urlList.get(0));
                urlList.remove(0);
            }
            itemImage.setItem(itemId);

            return itemImage;
        }
    }

    public ItemDto.SingleResponseDto itemToSingleResponseDto(Item item) {
        if(item == null) {
            return null;
        }
        else {
            ItemDto.SingleResponseDto responseDto = new ItemDto.SingleResponseDto();

            //TODO: Member class 완성되면 주석 안의 코드로 변경
            //responseDto.setMember_nickname(item.getMember().getMemberNickname);
            responseDto.setMember_nickname("테스트닉네임");

            responseDto.setStatus(item.getStatus().name());
            responseDto.setTitle(item.getTitle());
            responseDto.setContent(item.getContent());

            String endTimeString = item.getEndTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            responseDto.setEnd_time(endTimeString);

            responseDto.setCategory(item.getCategory().getName());
            responseDto.setItem_image_urls(item.getItemImages()
                    .stream()
                    .map(ItemImage::getImageUrl)
                    .collect(Collectors.toList())
            );
            responseDto.setStart_price(item.getStartPrice());
            responseDto.setBid_unit(item.getBidUnit());
            responseDto.setCurrent_price(item.getCurrentPrice());
            responseDto.setBuy_now_price(item.getBuyNowPrice());

            return responseDto;
        }
    }

    public ItemDto.ResponseDto itemToResponseDto(Item item) {
        if(item == null) {
            return null;
        }
        else {
            ItemDto.ResponseDto responseDto = new ItemDto.ResponseDto();

            //TODO: Member class 완성되면 주석 안의 코드로 변경
            //responseDto.setMember_id(item.getMember().getMemberId);
            //responseDto.setMember_nickname(item.getMember().getMemberNickname);
            responseDto.setMember_id(1L);
            responseDto.setMember_nickname("테스트닉네임");

            responseDto.setItem_id(item.getItemId());
            responseDto.setStatus(item.getStatus().name());
            responseDto.setTitle(item.getTitle());

            String endTimeString = item.getEndTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            responseDto.setEnd_time(endTimeString);

            responseDto.setCategory(item.getCategory().getName());
            responseDto.setItem_image_urls(item.getItemImages()
                    .stream()
                    .map(ItemImage::getImageUrl)
                    .collect(Collectors.toList())
            );
            responseDto.setStart_price(item.getStartPrice());
            responseDto.setBid_unit(item.getBidUnit());
            responseDto.setCurrent_price(item.getCurrentPrice());
            responseDto.setBuy_now_price(item.getBuyNowPrice());

            return responseDto;
        }
    }

    public ItemDto.MultiResponseDto itemPageToMultiResponseDto(Page<Item> itemPage) {
        if(itemPage == null) {
            return null;
        }
        else {
            List<ItemDto.ResponseDto> responseDtos = itemPage
                    .stream()
                    .map(this::itemToResponseDto)
                    .collect(Collectors.toList());
            ItemDto.MultiResponseDto multiResponseDto = new ItemDto.MultiResponseDto();
            multiResponseDto.setItems(responseDtos);
            multiResponseDto.setPage_info(PageInfo
                    .builder()
                            .page_number(itemPage.getNumber() + 1)
                            .page_size(itemPage.getSize())
                            .total_elements(itemPage.getTotalElements())
                            .total_pages(itemPage.getTotalPages())
                    .build()
            );

            return multiResponseDto;
        }
    }
}
