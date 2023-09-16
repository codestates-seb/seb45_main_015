import FavoritePageContainer from "./page_style/FavoritePage_styled";
import { Link } from "react-router-dom";
import { SelectItemCard, DeleteItemCard } from "../components/ItemCard";
import { SmallButtonB, SmallButtonD } from "../components/ButtonComponent";
import { getFavorite, deleteItem } from "../API/FetchAPI";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FavoritePage: React.FC = () => {
  // const [page, setPage] = useState<number>(18);
  // const [isData, setIsData] = useState<number[]>([]);
  const [page, setPage] = useState<number>(100);
  const [buttonOption, setButtonOption] = useState<string>("");
  const handleItemRefetch = () => {
    refetch();
  };
  const handleSelect = () => {
    if (buttonOption === "select") {
      return setButtonOption("");
    } else {
      return setButtonOption("select");
    }
  };
  const handleAllSelect = () => {
    if (buttonOption === "allSelect") {
      return setButtonOption("");
    } else {
      return setButtonOption("allSelect");
    }
  };

  //------------------------------------------------------------------
  interface objTest {
    bid_unit: number;
    buy_now_price: number;
    buyer_id: null;
    buyer_nickname: null;
    category: string;
    content: string;
    current_price: number;
    end_time: string;
    item_id: number;
    item_image_urls: string[];
    seller_id: number;
    seller_nickname: string;
    start_price: number;
    status: string;
    title: string;
    wish_id: number;
  }
  const allFavoriteItemId = async () => {
    const result = await getFavorite(1, 1000);
    const all_Id = result.wishes.map((el: objTest) => {
      return el.item_id;
    });
    console.log(all_Id);
    return all_Id;
  };
  const deleteData = async () => {
    const result = await deleteItem(1, await allFavoriteItemId());
    return result;
  };
  const { mutate: deleteMutate } = useMutation(["deleteItem"], deleteData, {
    onSuccess: () => {
      refetch();
    },
  });
  const handleAllDelete = () => {
    deleteMutate();
  };

  //-------------------------------------------------

  const moreFavoriteItem = () => {
    setPage(page + 20);
  };

  const getData = async () => {
    const result = await getFavorite(1, page);
    return result.wishes;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["favoriteList", page],
    getData,
    {
      keepPreviousData: true,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{`Error fetching data ${isError}`}</div>;
  }

  return data.length !== 0 ? (
    <FavoritePageContainer>
      <h2>찜목록</h2>
      <div className="topButtonWrap">
        <div className="topButton">
          <button
            className={buttonOption === "select" ? "onclick" : "unclick"}
            onClick={handleSelect}
          >
            상품 선택
          </button>
        </div>
        <div className="topButton">
          <button
            className={buttonOption === "allSelect" ? "onclick" : "unclick"}
            onClick={handleAllSelect}
          >
            전체 선택
          </button>
        </div>
        <div className="topButton">
          <button className="allDelete" onClick={handleAllDelete}>
            전체상품 삭제
          </button>
        </div>
      </div>
      <div className="itemcontainer">
        <ul>
          {buttonOption === "allDelete" //첫번째 조건
            ? data.map((el: any, index: number) => (
                <li key={index}>
                  <DeleteItemCard
                    cardData={el}
                    onItemRefetch={handleItemRefetch}
                  />
                </li>
              ))
            : buttonOption === "allSelect" //두번째 조건
            ? data.map((el: any, index: number) => (
                <li key={index}>
                  <SelectItemCard
                    cardData={el}
                    onItemRefetch={handleItemRefetch}
                  />
                </li>
              ))
            : data.map((el: any, index: number) => (
                <li key={index}>
                  <DeleteItemCard
                    cardData={el}
                    onItemRefetch={handleItemRefetch}
                  />
                </li>
              ))}
          {/* 첫번째 두번째 가 false일 경우 무조건 세번째 반환 */}

          {/* ------------------------------------------- */}
          {/* //삼항연산자 여러조건 사용시
  const result =
    condition1
    ? '첫 번째 조건'
    : condition2
    ? '두 번째 조건'
    : '세 번째 조건';

   위의 코드에서 condition1이 참이면 '첫 번째 조건이 참'을 반환
   그렇지 않으면 condition2가 참이면 '두 번째 조건이 참'을 반환
   그렇지 않으면 '세 번째 조건이 참'을 반환 */}
        </ul>
      </div>
      <div className="bottomButton">
        <div className="moreButton">
          <SmallButtonB value="더보기" onClick={moreFavoriteItem} />
        </div>
        <div className="PageButton">
          <Link to="/allList">
            <SmallButtonD value="전체상품 보러가기" />
          </Link>
        </div>
      </div>
    </FavoritePageContainer>
  ) : (
    <FavoritePageContainer>
      <h2>찜목록</h2>
      <div className="noneItemContainer">
        <FontAwesomeIcon icon={faHeart} className="noneFavorite" />
        <p>찜한 상품이 없습니다.</p>
        <div className="bottomButton">
          <Link to="/allList">
            <SmallButtonD value="전체상품 보러가기" />
          </Link>
        </div>
      </div>
    </FavoritePageContainer>
  );
};

export default FavoritePage;
