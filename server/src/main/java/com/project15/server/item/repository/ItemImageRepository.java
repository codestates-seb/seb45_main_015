package com.project15.server.item.repository;

import com.project15.server.item.entity.ItemImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemImageRepository extends JpaRepository<ItemImage, Long> {
    Optional<ItemImage> findByImageUrl(String imageUrl);
}
