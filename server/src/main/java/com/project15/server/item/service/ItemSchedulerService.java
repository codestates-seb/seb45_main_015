package com.project15.server.item.service;

import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemStatus;
import com.project15.server.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemSchedulerService {

    private final ItemRepository itemRepository;

    @Scheduled(fixedRate = 60000)
    public void changeToWaiting() {
        List<Item> waitingItemList= itemRepository.findByStatus(ItemStatus.WAITING);

        LocalDateTime currentTime = LocalDateTime.now();

        if(!waitingItemList.isEmpty()) {
            waitingItemList.stream().filter(item -> item.getCreatedAt().plusMinutes(5).isBefore(currentTime))
                    .forEach(item -> item.setStatus(ItemStatus.BIDDING));
        }

        itemRepository.flush();
    }

    @Scheduled(fixedRate = 60000, initialDelay = 10000)
    public void changeToTrading() {
        List<Item> biddingItemList= itemRepository.findByStatus(ItemStatus.BIDDING);

        LocalDateTime currentTime = LocalDateTime.now();

        if(!biddingItemList.isEmpty()) {
            biddingItemList.stream().filter(item -> item.getEndTime().isBefore(currentTime) && item.getBuyer() != null)
                    .forEach(item -> item.setStatus(ItemStatus.TRADING));
        }

        itemRepository.flush();
    }

    @Scheduled(fixedRate = 60000, initialDelay = 20000)
    public void changeToFailed() {
        List<Item> biddingItemList= itemRepository.findByStatus(ItemStatus.BIDDING);

        LocalDateTime currentTime = LocalDateTime.now();

        if(!biddingItemList.isEmpty()) {
            biddingItemList.stream().filter(item -> item.getEndTime().isBefore(currentTime) && item.getBuyer() == null)
                    .forEach(item -> item.setStatus(ItemStatus.FAILED));
        }

        itemRepository.flush();
    }
}
