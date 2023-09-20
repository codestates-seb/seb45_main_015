import {
  ButtonWrapper,
  Container,
  Content,
  ContentSection,
  Icon,
  Img,
  ImgList,
  ImgListContent,
  ImgWrapper,
  ItemDetailContainer,
  ItemDetailContent,
  Text,
  Wrapper,
} from "./page_style/ItemDetailPage_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchItemDetail,
  postItemDetailBid,
  postItemDetailBuyNow,
} from "../API/FetchAPI";
import { useEffect, useState } from "react";
import { LargeButtonA, LargeButtonC } from "../components/ButtonComponent";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { RemainingTime } from "../hooks/RemainingTime";
import { current } from "@reduxjs/toolkit";

function ItemDetailPage() {
  const queryClient = useQueryClient();
  const itemIdParams = useParams().itemId;
  const [itemId, setItemId] = useState<number | null>(Number(itemIdParams));
  const [mainImage, setMainImage] = useState<number>(0);
  const [remainingTimeString, setRemainingTimeString] = useState<string>("");
  const [isAuctionEnded, setIsAuctionEnded] = useState<boolean>(false);
  const memberId = localStorage.getItem("memberId");

  const { data, isLoading } = useQuery(
    ["itemDetail", itemId],
    () =>
      memberId && itemId
        ? fetchItemDetail(itemId, Number(memberId))
        : itemId && fetchItemDetail(itemId),
    {
      refetchInterval: 50000,
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["itemDetail", itemId]);
    }, 50000);

    return () => {
      clearInterval(interval);
    };
  }, [itemId, queryClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && data) {
        const remainingTime = RemainingTime(data.end_time);
        setRemainingTimeString(remainingTime);

        if (remainingTime === "경매가 종료되었습니다.") {
          clearInterval(interval);
          setIsAuctionEnded(true);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const handleChangeMainImage = (index: number) => {
    setMainImage(index);
  };

  const handleChangeMainPrevImage = () => {
    if (mainImage === 0) {
      setMainImage(data.item_image_urls.length - 1);
    } else {
      setMainImage(mainImage - 1);
    }
  };

  const handleChangeMainNextImage = () => {
    if (mainImage === data.item_image_urls.length - 1) {
      setMainImage(0);
    } else {
      setMainImage(mainImage + 1);
    }
  };

  const handleBidButton = () => {
    let bidPrice = 0;
    if (data.current_price === 0) {
      bidPrice = data.start_price;
    } else {
      bidPrice = data.current_price + data.bid_unit;
    }

    if (data.buy_now_price <= bidPrice) {
      if (itemId) {
        const buyNowData = {
          item_id: itemId,
          buyer_id: Number(memberId),
        };
        postItemDetailBuyNow(buyNowData);
      }
    } else {
      if (itemId) {
        const bidData = {
          item_id: itemId,
          buyer_id: Number(memberId),
          bid_price: bidPrice,
        };
        postItemDetailBid(bidData);
      }
    }
  };

  const handleBuyNowButton = () => {
    if (itemId) {
      const buyNowData = {
        item_id: itemId,
        buyer_id: Number(memberId),
      };
      postItemDetailBuyNow(buyNowData);
    }
  };

  return (
    <Container>
      <ItemDetailContainer>
        <ItemDetailContent className="center">
          <Text className="detail-timer">{remainingTimeString}</Text>
        </ItemDetailContent>
        <ItemDetailContent>
          <Text className="detail-path">{`카테고리 > ${data.category}`}</Text>
        </ItemDetailContent>
        <ItemDetailContent className="space-between">
          <ContentSection>
            <ImgWrapper className="detail-main-img">
              <Img src={data.item_image_urls[mainImage]} />
            </ImgWrapper>
            <ImgListContent>
              <Icon onClick={handleChangeMainPrevImage}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Icon>
              <ImgList>
                {data.item_image_urls.map((data: string, index: number) => (
                  <ImgWrapper
                    key={index}
                    className="detail-sub-img"
                    onClick={() => handleChangeMainImage(index)}
                  >
                    <Img src={data} />
                  </ImgWrapper>
                ))}
              </ImgList>
              <Icon onClick={handleChangeMainNextImage}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Icon>
            </ImgListContent>
          </ContentSection>
          <ContentSection>
            <Content className="detail-info-content">
              <Wrapper className="column">
                <Text className="detail-title">{data.title}</Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">시작가격</Text>
                <Text className="detail-info">
                  {data.start_price.toLocaleString()}원
                </Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">즉시구매가</Text>
                <Text className="detail-info">
                  {data.buy_now_price.toLocaleString()}원
                </Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">호가</Text>
                <Text className="detail-info">
                  {data.bid_unit.toLocaleString()}원
                </Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">상위입찰가</Text>
                <Text className="detail-info">
                  {data.current_price.toLocaleString()}원
                </Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">상위입찰자</Text>
                <Text className="detail-info">
                  {data.buyer_nickname ? data.buyer_nickname : "없음"}
                </Text>
              </Wrapper>
              {data.status !== "TRADING" && (
                <Wrapper className="space-between">
                  <Text className="detail-info-init">입찰가</Text>
                  <Text className="detail-info">
                    {data.current_price === 0
                      ? data.start_price.toLocaleString()
                      : (data.current_price + data.bid_unit).toLocaleString()}
                    원
                  </Text>
                </Wrapper>
              )}
            </Content>
            {data.status === "BIDDING" && (
              <Content className="detail-button-content">
                <Wrapper className="space-between">
                  {Number(data.buyer_id) !== Number(memberId) ? (
                    <ButtonWrapper
                      className="margin-right"
                      onClick={handleBidButton}
                    >
                      <LargeButtonA value="입찰하기" />
                    </ButtonWrapper>
                  ) : (
                    <ButtonWrapper
                      className="margin-right top-bid-button"
                      onClick={handleBidButton}
                    >
                      <LargeButtonA value="추가 입찰하기" />
                    </ButtonWrapper>
                  )}
                  <ButtonWrapper onClick={handleBuyNowButton}>
                    <LargeButtonA value="즉시구매" />
                  </ButtonWrapper>
                </Wrapper>
                <ButtonWrapper className="margin-top">
                  <LargeButtonC value="찜하기" />
                </ButtonWrapper>
                {/* <ButtonWrapper className="margin-top">
                <LargeButtonC value="수정하기" />
              </ButtonWrapper> */}
              </Content>
            )}
          </ContentSection>
        </ItemDetailContent>
        <ItemDetailContent className="column">
          <Wrapper className="detail-moreinfo-wrapper">
            <Text className="detail-info-init">판매자</Text>
            <Text className="detail-info">{data.seller_nickname}</Text>
          </Wrapper>
          <Wrapper className="column">
            <Text className="detail-info-init">상세정보</Text>
            <Text className="detail-description">{data.content}</Text>
          </Wrapper>
        </ItemDetailContent>
      </ItemDetailContainer>
    </Container>
  );
}

export default ItemDetailPage;
