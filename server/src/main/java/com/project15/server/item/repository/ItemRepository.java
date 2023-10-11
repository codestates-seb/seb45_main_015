package com.project15.server.item.repository;

import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

    Page<Item> findByCategoryCategoryId(Long categoryId, Pageable pageable);

    @Lock(LockModeType.PESSIMISTIC_READ)
    @Query("SELECT i FROM Item AS i WHERE i.id = :itemId")
    Optional<Item> findWithIdForUpdate(@Param("itemId") Long itemId);

    Page<Item> findBySellerMemberIdAndStatus(Long sellerId, ItemStatus itemStatus, Pageable pageable);

    Page<Item> findBySellerMemberIdOrBuyerMemberId(Long sellerId, Long buyerId, Pageable pageable);

    @Query("SELECT i FROM Item i WHERE (i.seller.memberId = :sellerId OR i.buyer.memberId = :buyerId) AND i.status = :itemStatus")
    Page<Item> findBySellerMemberIdOrBuyerMemberIdAndStatus(Long sellerId, Long buyerId, ItemStatus itemStatus, Pageable pageable);

    Page<Item> findBySellerMemberId(Long sellerId, Pageable pageable);

    Page<Item> findByBuyerMemberIdAndStatus(Long buyerId, ItemStatus itemStatus, Pageable pageable);

    //@Query("SELECT i FROM Item AS i WHERE i.content LIKE %:searchKeyword%")
    @Query(value = "SELECT i FROM Item AS i WHERE MATCH(i.content) AGAINST(:searchKeywordIN NATURAL LANGUAGE MODE)",
            nativeQuery = true) //Full Scan 이슈로 인해 LIKE 로 검색하는 방식에서 Full Text Index 로 검색하는 방식으로 변경
    Page<Item> findByTitleContaining(@Param("searchKeyword") String searchKeyword, Pageable pageable);

    List<Item> findByStatus(ItemStatus itemStatus);
}
