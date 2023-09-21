package com.project15.server.item.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ItemSchedulerService {

    @Scheduled(fixedRate = 60000)
    public void checkItemStatus() {

    }
}
