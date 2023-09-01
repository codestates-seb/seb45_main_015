package com.project15.server.item.mapper;

import com.project15.server.category.entity.Category;
import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
import com.project15.server.member.Member;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

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
            item.setAuctionTime(postDto.getAuction_time());
            item.setStartPrice(postDto.getStart_price());
            item.setBidUnit(postDto.getBid_unit());
            item.setCurrentPrice(postDto.getStart_price());
            item.setBuyNowPrice(postDto.getBuy_now_price());
//            Member member = new Member();
//            member.setMemberId(postDto.getMember_id());
//            item.setMember(member);

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
}
