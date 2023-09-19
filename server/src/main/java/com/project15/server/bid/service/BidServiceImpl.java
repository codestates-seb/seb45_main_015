package com.project15.server.bid.service;

import com.project15.server.bid.entity.Bid;
import com.project15.server.bid.repository.BidRepository;
import com.project15.server.exception.ExceptionCode;
import com.project15.server.exception.GlobalException;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemStatus;
import com.project15.server.item.repository.ItemRepository;
import com.project15.server.member.entity.Member;
import com.project15.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BidServiceImpl implements BidService {

    private final BidRepository bidRepository;

    private final ItemRepository itemRepository;

    private final MemberRepository memberRepository;

    @Override
    public void createBid(Bid bid) {
        //itemRepository.findByIdForUpdate 에 Lock(SELECT FOR UPDATE)
        Item findItem = itemRepository
                .findWithIdForUpdate(bid.getItem().getItemId())
                .orElseThrow(() -> new GlobalException(ExceptionCode.ITEM_NOT_FOUND));

        if(!findItem.getStatus().equals(ItemStatus.BIDDING)) {
            throw new GlobalException(ExceptionCode.NOT_ON_AUCTION);
        }

        if(findItem.getSeller().getMemberId().equals(bid.getBuyer().getMemberId())) {
            throw new GlobalException(ExceptionCode.SELLER_CAN_NOT_BIDDING);
        }

        int startPrice = findItem.getStartPrice();
        int bidUnit = findItem.getBidUnit();
        int currentPrice = findItem.getCurrentPrice();

        int bidPrice = bid.getBidPrice();

        //요청된 입찰가가 현재가격과 호가에 맞게 책정되었는지 검증하는 메서드
        //클라이언트 쪽에서도 한번 검증해서 보내주지만 서버에서도 한번 더 검증
        verifyBidPrice(startPrice, bidUnit, currentPrice, bidPrice);

        Optional<Bid> optionalBid = bidRepository.findByBuyerMemberIdAndItemItemId(bid.getBuyer().getMemberId(), bid.getItem().getItemId());
        if(optionalBid.isPresent()) {
            //한 member 가 동일한 item 에 중복 입찰하면 업데이트
            Bid findBid = optionalBid.get();

            findBid.setBidPrice(bid.getBidPrice());
        }
        else {
            bidRepository.save(bid);
        }
        findItem.setCurrentPrice(bid.getBidPrice());
        findItem.setBuyer(bid.getBuyer());
    }

    private void verifyBidPrice(int startPrice, int bidUnit, int currentPrice, int bidPrice) {
        //bidUnit(호가)이 0보다 크고 10보다 작거나 같으면 bidUnit 을 퍼센트로 간주, 입찰가는 bidUnit 에 따라 현재가의 101~110% 이어야 함
        boolean isPercent = bidUnit >= 1 && bidUnit <= 10;

        if(currentPrice == 0 && startPrice != bidPrice) {
            throw new GlobalException(ExceptionCode.BID_UNIT_INVALID);
        }

        //소수점은 버림
        int result = (currentPrice * (100 + bidUnit)) / 100;
        if(currentPrice != 0 && isPercent && result != bidPrice) {
            throw new GlobalException(ExceptionCode.BID_UNIT_INVALID);
        }

        //bidUnit 이 1000 이상이면 bidPrice 는 currentPrice 에 bidUnit 이 더해진 값이어야 함
        result = currentPrice + bidUnit;
        if(currentPrice != 0 && !isPercent && result != bidPrice) {
            throw new GlobalException(ExceptionCode.BID_UNIT_INVALID);
        }
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void buyNow(Long buyerId, Long itemId) {
        Item findItem = itemRepository.findWithIdForUpdate(itemId)
                .orElseThrow(() -> new GlobalException(ExceptionCode.ITEM_NOT_FOUND));

        if(!findItem.getStatus().equals(ItemStatus.BIDDING) || findItem.getBuyNowPrice() == null) {
            throw new GlobalException(ExceptionCode.BUY_NOW_UNAVAILABLE);
        }

        Member findBuyer = memberRepository.findById(buyerId)
                .orElseThrow(() -> new GlobalException(ExceptionCode.MEMBER_NOT_FOUND));

        findItem.setBuyer(findBuyer);
        findItem.setStatus(ItemStatus.TRADING);
    }
}
