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
} from "./style/ItemListCard.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function ItemListCard() {
  return (
    <Container>
      <ItemContent>
        <ImgContainer>
          <FontAwesomeIcon icon={faImage} />
        </ImgContainer>
        <InfoContainer>
          <TitleWrapper>
            <ProductName>상품명</ProductName>
            <Button>별점 남기기</Button>
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
