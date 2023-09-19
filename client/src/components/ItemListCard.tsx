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

const ItemListCard: React.FC = (props: MyTradeType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(props);

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
          <img src="" alt="" />
        </ImgContainer>
        <InfoContainer>
          <TitleWrapper>
            <ProductName>{props.title ? props.title : ""}</ProductName>
            <Button onClick={openModal}>별점 남기기</Button>
            {isModalOpen && <Modal mode={"star"} closeModal={closeModal} />}
          </TitleWrapper>
          <TextContainer>
            <TextSection>
              <TextWrapper>
                <Text className="itemListCard-product-key">거래상대</Text>
                <Text className="itemListCard-product-value">
                  {props.seller_nickname ? props.seller_nickname : ""}
                </Text>
              </TextWrapper>
              <TextWrapper>
                <Text className="itemListCard-product-key">거래상태</Text>
                <Text className="itemListCard-product-value">
                  {props.status ? props.status : ""}
                </Text>
              </TextWrapper>
              <TextWrapper>
                <Text className="itemListCard-product-key">거래일자</Text>
                <Text className="itemListCard-product-value">
                  {props.end_time ? props.end_time : ""}
                </Text>
              </TextWrapper>
            </TextSection>
            <TextSection>
              <TextWrapper className="product-price-wrapper">
                <Text className="itemListCard-product-key">최저가</Text>
                <Text className="itemListCard-product-value">
                  {props.start_price ? props.start_price : "0"}원
                </Text>
              </TextWrapper>
              <TextWrapper className="product-price-wrapper">
                <Text className="itemListCard-product-key">입찰가</Text>
                <Text className="itemListCard-product-value">
                  {props.current_price ? props.current_price : "0"}원
                </Text>
              </TextWrapper>
              <TextWrapper className="product-price-wrapper">
                <Text className="itemListCard-product-key">최고가</Text>
                <Text className="itemListCard-product-value">
                  {props.buy_now_price ? props.buy_now_price : "0"}원
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
