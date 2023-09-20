package com.project15.server.wish.service;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.wish.entity.Wish;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WishService {

    ItemDto.ResponseDto createWish(Wish wish, Long itemId);

    void removeWishes(Long memberId, List<Long> itemIds);

    ItemDto.ResponseDto removeWish(Long memberId, Long itemId);

    Page<Wish> findWishes(int pageNumber, int pageSize, Long memberId);
}
