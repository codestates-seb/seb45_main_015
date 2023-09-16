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
import {
  faHeart,
  faTimes,
  faCheck,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { postItem, deleteItem } from "../API/FetchAPI";

interface wishesItemCardProps {
  cardData: {
    wish_id: number;
    item_id: number;
    seller_id: number;
    seller_nickname: string;
    buyer_id: string | null;
    buyer_nickname: string | null;
    status: string;
    title: string;
    content: string;
    end_time: string;
    category: string;
    item_image_urls: string[];
    start_price: number;
    bid_unit: number;
    current_price: number;
    buy_now_price: number;
  };
  onItemRefetch: () => void;
  favoriteState?: boolean;
}

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
  onItemRefetch: () => void;
  favoriteState: boolean;
}

export function ItemCard({
  cardData,
  favoriteState,
  onItemRefetch,
}: ItemCardProps) {
  const [state, setState] = useState(favoriteState);

  //--------하트버튼으로 찜목록 추가
  const postData = async () => {
    const result = await postItem(cardData.item_id, 1);
    return result;
  };

  const { mutate: addMutate } = useMutation(["addItem"], postData, {
    onSuccess: () => {
      onItemRefetch();
    },
  });
  const handleFavoriteAdd = () => {
    addMutate();
    setState(!state);
  };

  //----------X,하트 버튼으로 찜목록 삭제
  const deleteData = async () => {
    const result = await deleteItem(1, [cardData.item_id]);

    return [result];
  };
  const { mutate: deleteMutate } = useMutation(["deleteItem"], deleteData);
  const handleFavoriteDelete = () => {
    deleteMutate();
    setState(!state);
  };

  return (
    <Container>
      <ImgContainer>
        <img src={`${cardData.item_image_urls[0]}`} />
        <Icon
          className={state ? "favorite-on" : "favorite-off"}
          onClick={state ? handleFavoriteDelete : handleFavoriteAdd}
        >
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
            <Text className="itemCard-product-key">종료</Text>
            <Text className="itemCard-product-value card-date">
              {cardData.end_time}
            </Text>
          </Wrapper>
        </InfoWrapper>
      </InfoContainer>
    </Container>
  );
}

export function SelectItemCard({ cardData }: wishesItemCardProps) {
  const [favorite, setFavorite] = useState(false);
  const handleFavorite = () => {
    setFavorite(!favorite);
    // postItem(cardData.item_id, memberId);
  };
  return (
    <Container>
      <ImgContainer>
        <img src={`${cardData.item_image_urls[0]}`} />
        <Icon
          className={favorite ? "favorite-on" : "favorite-off"}
          onClick={handleFavorite}
        >
          <FontAwesomeIcon icon={faCheck} />
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
              {cardData.seller_nickname}
            </Text>
          </Wrapper>
          <Wrapper>
            <Text className="itemCard-product-key">종료</Text>
            <Text className="itemCard-product-value card-date">
              {cardData.end_time}
            </Text>
          </Wrapper>
        </InfoWrapper>
      </InfoContainer>
    </Container>
  );
}

export function DeleteItemCard({
  cardData,
  onItemRefetch,
}: wishesItemCardProps) {
  const DeleteData = async () => {
    const result = await deleteItem(1, [cardData.item_id]);
    return result;
  };
  const { mutate } = useMutation(["deleteItem"], DeleteData, {
    onSuccess: () => {
      onItemRefetch();
    },
  });
  const handleDeleteButtonClick = () => {
    mutate();
  };

  return (
    <Container>
      <ImgContainer>
        <img src={`${cardData.item_image_urls[0]}`} />
        <Icon className={"favorite-off"} onClick={handleDeleteButtonClick}>
          <FontAwesomeIcon icon={faTimes} />
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
              {cardData.seller_nickname}
            </Text>
          </Wrapper>
          <Wrapper>
            <Text className="itemCard-product-key">종료</Text>
            <Text className="itemCard-product-value card-date">
              {cardData.end_time}
            </Text>
          </Wrapper>
        </InfoWrapper>
      </InfoContainer>
    </Container>
  );
}
