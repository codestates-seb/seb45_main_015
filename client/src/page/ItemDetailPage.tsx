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
import { useEffect, useState } from "react";
import { LargeButtonA, LargeButtonC } from "../components/ButtonComponent";

function ItemDetailPage() {
  const itemId = 1;
  const queryClient = useQueryClient();
  const [mainImage, setMainImage] = useState<number>(0);

  const { data, isLoading } = useQuery(
    ["itemDetail", itemId],
    () => fetchItemDetail(itemId),
    {
      refetchInterval: 50000,
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
                <Text className="detail-info-init">최저가</Text>
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
                <Text className="detail-info-init">현재입찰가</Text>
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
              <Wrapper className="space-between">
                <Text className="detail-info-init">입찰가</Text>
                <Text className="detail-info">
                  {data.current_price === 0
                    ? (data.start_price + data.bid_unit).toLocaleString()
                    : (data.current_price + data.bid_unit).toLocaleString()}
                  원
                </Text>
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
