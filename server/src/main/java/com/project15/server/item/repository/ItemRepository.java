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
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

    Page<Item> findByCategoryCategoryId(Long categoryId, Pageable pageable);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT i FROM Item AS i WHERE i.id = :itemId")
    Optional<Item> findWithIdForUpdate(@Param("itemId") Long itemId);

    Page<Item> findBySellerMemberIdAndStatus(Long sellerId, ItemStatus itemStatus, Pageable pageable);

    @Query("SELECT i FROM Item AS i WHERE i.content LIKE %:searchKeyword%")
    Page<Item> findByContentContaining(@Param("searchKeyword") String searchKeyword, Pageable pageable);
}
