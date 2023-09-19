package com.project15.server.rating.repository;

import com.project15.server.rating.entity.StarRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StarRatingRepository extends JpaRepository<StarRating, Long> {

    @Query("SELECT AVG(s.star) FROM StarRating AS s WHERE s.seller.memberId = :memberId")
    Optional<Double> findAverageStar(@Param("memberId") Long memberId);

    Optional<StarRating> findByItemItemId(Long itemId);
}
