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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Modal from "../alret/Modal";
import { useState } from "react";

function ItemListCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <ProductName>상품명</ProductName>
            <Button onClick={openModal}>별점 남기기</Button>
            {isModalOpen && <Modal mode={"star"} closeModal={closeModal} />}
          </TitleWrapper>
          <TextContainer>
            <TextSection>
              <TextWrapper>
                <Text className="itemListCard-product-key">거래상대</Text>
                <Text className="itemListCard-product-value">이름</Text>
              </TextWrapper>
              <TextWrapper>
                <Text className="itemListCard-product-key">거래상태</Text>
                <Text className="itemListCard-product-value">거래완료</Text>
              </TextWrapper>
              <TextWrapper>
                <Text className="itemListCard-product-key">거래일자</Text>
                <Text className="itemListCard-product-value">
                  23.08.28 / 18 : 42 : 22
                </Text>
              </TextWrapper>
            </TextSection>
            <TextSection>
              <TextWrapper className="product-price-wrapper">
                <Text className="itemListCard-product-key">최저가</Text>
                <Text className="itemListCard-product-value">0원</Text>
              </TextWrapper>
              <TextWrapper className="product-price-wrapper">
                <Text className="itemListCard-product-key">입찰가</Text>
                <Text className="itemListCard-product-value">0원</Text>
              </TextWrapper>
              <TextWrapper className="product-price-wrapper">
                <Text className="itemListCard-product-key">최고가</Text>
                <Text className="itemListCard-product-value">0원</Text>
              </TextWrapper>
            </TextSection>
          </TextContainer>
        </InfoContainer>
      </ItemContent>
    </Container>
  );
}

export default ItemListCard;
