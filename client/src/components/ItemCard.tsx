import {
  Container,
  Icon,
  ImgContainer,
  InfoContainer,
  InfoWrapper,
  Wrapper,
  Text,
} from "./components_style/ItemCard.styled_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faImage } from "@fortawesome/free-solid-svg-icons";

function ItemCard() {
  return (
    <Container>
      <ImgContainer>
        <FontAwesomeIcon icon={faImage} />
        <Icon className="favorite-on">
          <FontAwesomeIcon icon={faHeart} />
        </Icon>
      </ImgContainer>
      <InfoContainer>
        <InfoWrapper>
          <Text className="itemCard-product-name">상품명</Text>
          <Wrapper>
            <Text className="itemCard-product-key">최저가</Text>
            <Text className="itemCard-product-value">0원</Text>
          </Wrapper>
          <Wrapper>
            <Text className="itemCard-product-key">입찰가</Text>
            <Text className="itemCard-product-value">0원</Text>
          </Wrapper>
          <Wrapper>
            <Text className="itemCard-product-key">최고가</Text>
            <Text className="itemCard-product-value">0원</Text>
          </Wrapper>
          <Wrapper className="itemCard-product-seller">
            <Text className="itemCard-product-key">판매자명</Text>
            <Text className="itemCard-product-value">이름</Text>
          </Wrapper>
          <Wrapper>
            <Text className="itemCard-product-key">종료시간</Text>
            <Text className="itemCard-product-value">24 : 00 : 00</Text>
          </Wrapper>
        </InfoWrapper>
      </InfoContainer>
    </Container>
  );
}

export default ItemCard;
