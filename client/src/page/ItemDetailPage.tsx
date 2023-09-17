import {
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
import { fetchItemDetail } from "../API/FetchAPI";
import { useEffect, useRef, useState } from "react";
import { LargeButtonA, LargeButtonC } from "../components/ButtonComponent";

function ItemDetailPage() {
  const itemId = 112;
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { data, isLoading } = useQuery(
    ["itemDetail", itemId],
    () => fetchItemDetail(itemId),
    {
      refetchInterval: 50000,
      enabled: !isDragging, // 스크롤 중인 경우에만 호출 비활성화
    },
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      await queryClient.invalidateQueries(["itemDetail", itemId]);
    }, 50000);

    return () => {
      clearInterval(interval);
    };
  }, [itemId, queryClient]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(containerRef.current?.scrollLeft || 0);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;
    const deltaX = (startX || 0) - e.clientX;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft + deltaX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      <ItemDetailContainer>
        <ItemDetailContent className="center">
          <Text className="detail-timer">{data.end_time}</Text>
        </ItemDetailContent>
        <ItemDetailContent>
          <Text className="detail-path">{`카테고리 > 패션의류/잡화`}</Text>
        </ItemDetailContent>
        <ItemDetailContent className="space-between">
          <ContentSection>
            <ImgWrapper className="detail-main-img">
              <Img src={data.item_image_urls[0]} />
            </ImgWrapper>
            <ImgListContent>
              <Icon>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Icon>
              <ImgList
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                {data.item_image_urls.map((data: string, index: number) => (
                  <ImgWrapper key={index} className="detail-sub-img">
                    <Img src={data} />
                  </ImgWrapper>
                ))}
              </ImgList>
              <Icon>
                <FontAwesomeIcon icon={faChevronRight} />
              </Icon>
            </ImgListContent>
          </ContentSection>
          <ContentSection>
            <Content className="detail-info-content">
              <Wrapper className="column">
                <Text className="detail-title">{data.title}</Text>
                <Text className="detail-info-bidding">
                  현재 입찰중인 물건입니다.
                </Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">최저가</Text>
                <Text className="detail-info">{data.start_price}원</Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">입찰가</Text>
                <Text className="detail-info">{data.current_price}원</Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">즉시구매가</Text>
                <Text className="detail-info">{data.buy_now_price}원</Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">호가</Text>
                <Text className="detail-info">{data.bid_unit}원</Text>
              </Wrapper>
            </Content>
            <Content className="detail-button-content">
              <Wrapper className="space-between">
                <LargeButtonA value="입찰하기" />
                <LargeButtonA value="즉시구매" />
              </Wrapper>
              <LargeButtonC value="찜하기" />
              <LargeButtonC value="수정하기" />
            </Content>
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
