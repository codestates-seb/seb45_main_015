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

interface ItemCardProps {
  cardData: {
    member_id: number;
    member_nickname: string;
    item_id: number;
    title: string;
    end_time: string;
    category: string;
    item_image_urls: string[];
    start_price: number;
    bid_unit: number;
    current_price: number;
    buy_now_price: number;
  };
}

function ItemCard({ cardData }: ItemCardProps) {
  return (
    <Container>
      <ImgContainer>
        <img src={`${cardData.item_image_urls}`} />
        <Icon className="favorite-on">
          <FontAwesomeIcon icon={faHeart} />
        </Icon>
      </ImgContainer>
      <InfoContainer>
        <InfoWrapper>
          <Text className="itemCard-product-name">{cardData.title}</Text>
          <Wrapper>
            <Text className="itemCard-product-key">최저가</Text>
            <Text className="itemCard-product-value">
              {cardData.start_price}
            </Text>
          </Wrapper>
          <Wrapper>
            <Text className="itemCard-product-key">입찰가</Text>
            <Text className="itemCard-product-value">
              {cardData.current_price}
            </Text>
          </Wrapper>
          <Wrapper>
            <Text className="itemCard-product-key">최고가</Text>
            <Text className="itemCard-product-value">
              {cardData.buy_now_price}
            </Text>
          </Wrapper>
          <Wrapper className="itemCard-product-seller">
            <Text className="itemCard-product-key">판매자명</Text>
            <Text className="itemCard-product-value">
              {cardData.member_nickname}
            </Text>
          </Wrapper>
          <Wrapper>
            <Text className="itemCard-product-key">종료시간</Text>
            <Text className="itemCard-product-value">{cardData.end_time}</Text>
          </Wrapper>
        </InfoWrapper>
      </InfoContainer>
    </Container>
  );
}

export default ItemCard;
