package com.project15.server.wish.service;

import com.project15.server.item.entity.Item;
import com.project15.server.wish.entity.Wish;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WishService {

    void createWish(Wish wish);

    void removeWishes(Long memberId, List<Long> itemIds);

    Page<Wish> findWishes(int pageNumber, int pageSize, Long memberId);
}
