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
import { faHeart, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { postItem, deleteItem } from "../API/FetchAPI";
import { Link } from "react-router-dom";

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
  buttonOption: string;
  selectMode: boolean;
  handledAddOrDeleteId: (newId: number) => void;
  checkList: number[];
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
//title 길면 ...으로 단축
const shortenString = (str: string) => {
  if (str.length > 11) {
    return str.slice(0, 11) + ` ....`;
  } else {
    return str;
  }
};
export function ItemCard({
  cardData,
  favoriteState,
  onItemRefetch,
}: ItemCardProps) {
  const [state, setState] = useState(favoriteState);

  //--------하트버튼으로 찜목록 추가
  const postData = async () => {
    const result = await postItem(cardData.item_id);
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
    const result = await deleteItem([cardData.item_id]);

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
          <Text className="itemCard-product-name">
            {shortenString(cardData.title)}
          </Text>
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

export function DeleteItemCard({
  cardData, //카드 데이터
  onItemRefetch, //카드가 삭제되면 리패치
  buttonOption, //현재 찜목록 버튼옵션(선택모드,전체선택,전체삭제)
  selectMode, //현재 찜목록 페이지가 선택모드인지
  handledAddOrDeleteId, // 선택모드에서 카드 선택 추가
  checkList, // 현재 선택되어있는 카드들 [1,2,3,4]
}: wishesItemCardProps) {
  const [isCheck, setIsCheck] = useState(false);

  //------X눌러서 찜목록 삭제
  const DeleteData = async () => {
    const result = await deleteItem([cardData.item_id]);
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

  //--------선택모드일때 카드 눌러서 선택
  const handleCheckButtonClick = () => {
    handledAddOrDeleteId(cardData.item_id);
    setIsCheck(!isCheck);
  };
  return (
    <Container
      onClick={selectMode ? handleCheckButtonClick : undefined}
      isCheck={selectMode && isCheck ? true : false}
    >
      <ImgContainer>
        <img src={`${cardData.item_image_urls[0]}`} />
        {buttonOption === "select" || buttonOption === "allSelect" ? (
          <Icon>
            <FontAwesomeIcon
              icon={faCheck}
              className={
                checkList.includes(cardData.item_id) ? "check" : "unCheck"
              }
            />
          </Icon>
        ) : (
          <Icon onClick={handleDeleteButtonClick}>
            <FontAwesomeIcon icon={faTimes} />
          </Icon>
        )}
        ;
      </ImgContainer>
      <InfoContainer>
        <InfoWrapper>
          <Text className="itemCard-product-name">
            {shortenString(cardData.title)}
          </Text>
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
