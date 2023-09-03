package com.project15.server.item.repository;

import com.project15.server.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    Page<Item> findByCategoryCategoryId(Long categoryId, Pageable pageable);
}
