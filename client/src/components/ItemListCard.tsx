import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Container,
  ImgContainer,
  ItemContent,
  ProductName,
  Text,
  InfoContainer,
  TextSection,
  TextWrapper,
  TitleWrapper,
  TextContainer,
} from "./components_style/ItemListCard_styled";
import Modal from "../alret/Modal";
import { MyTradeType } from "../type/type";

const ItemListCard: React.FC<MyTradeType> = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(items);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <ItemContent>
        <ImgContainer>
          <FontAwesomeIcon icon={faImage} />
        </ImgContainer>
        <InfoContainer>
          <TitleWrapper>
            <ProductName>
              제목없음
              {/* {items.title ? items.title : "제목없음"} */}
            </ProductName>
            <Button onClick={openModal}>별점 남기기</Button>
            {isModalOpen && <Modal mode={"star"} closeModal={closeModal} />}
          </TitleWrapper>
          <TextContainer>
            <TextSection>
              <TextWrapper>
                <Text className="itemListCard-product-key">거래상대</Text>
                <Text className="itemListCard-product-value">
                  {items.seller_nickname}
                </Text>
              </TextWrapper>
              <TextWrapper>
                <Text className="itemListCard-product-key">거래상태</Text>
                <Text className="itemListCard-product-value">
                  {items.status}
                </Text>
              </TextWrapper>
              <TextWrapper>
                <Text className="itemListCard-product-key">거래일자</Text>
                <Text className="itemListCard-product-value">
                  {items.end_time}
                </Text>
              </TextWrapper>
            </TextSection>
            <TextSection>
              <TextWrapper className="product-price-wrapper">
                <Text className="itemListCard-product-key">최저가</Text>
                <Text className="itemListCard-product-value">
                  {items.start_price}원
                </Text>
              </TextWrapper>
              <TextWrapper className="product-price-wrapper">
                <Text className="itemListCard-product-key">입찰가</Text>
                <Text className="itemListCard-product-value">
                  {items.current_price}원
                </Text>
              </TextWrapper>
              <TextWrapper className="product-price-wrapper">
                <Text className="itemListCard-product-key">최고가</Text>
                <Text className="itemListCard-product-value">
                  {items.buy_now_price}원
                </Text>
              </TextWrapper>
            </TextSection>
          </TextContainer>
        </InfoContainer>
      </ItemContent>
    </Container>
  );
};

export default ItemListCard;
