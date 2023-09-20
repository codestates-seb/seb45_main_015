package com.project15.server.item.mapper;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
import com.project15.server.utils.PageInfo;
import com.project15.server.wish.entity.Wish;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
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
            item.setBuyNowPrice(postDto.getBuy_now_price());
            item.setSeller(postDto.getSeller_id());

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

    public ItemDto.ResponseDto itemToResponseDto(Item item, List<Long> itemIds) {
        if(item == null) {
            return null;
        }
        else {
            ItemDto.ResponseDto responseDto = new ItemDto.ResponseDto();
            responseDto.setSeller_id(item.getSeller().getMemberId());
            responseDto.setSeller_nickname(item.getSeller().getNickname());
            if(item.getBuyer() != null) {
                responseDto.setBuyer_id(item.getBuyer().getMemberId());
                responseDto.setBuyer_nickname(item.getBuyer().getNickname());
            }
            responseDto.setItem_id(item.getItemId());
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
            if(item.getBuyNowPrice() != null) {
                responseDto.setBuy_now_price(item.getBuyNowPrice());
            }
            if(itemIds != null && itemIds.contains(item.getItemId())) {
                responseDto.setIn_wish_list(true);
            }

            return responseDto;
        }
    }

    public ItemDto.MultiResponseDto itemPageToMultiResponseDto(Page<Item> itemPage, List<Long> itemIds) {
        if(itemPage == null) {
            return null;
        }
        else {
            List<ItemDto.ResponseDto> responseDtoList = itemPage
                    .stream()
                    .map(item -> itemToResponseDto(item, itemIds))
                    .collect(Collectors.toList());
            ItemDto.MultiResponseDto multiResponseDto = new ItemDto.MultiResponseDto();
            multiResponseDto.setItems(responseDtoList);
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