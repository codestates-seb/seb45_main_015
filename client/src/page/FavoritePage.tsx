import FavoritePageContainer from "./page_style/FavoritePage_styled";
import { Link } from "react-router-dom";
import {
  ItemCard,
  SelectItemCard,
  DeleteItemCard,
} from "../components/ItemCard";
import { SmallButtonD, SmallButtonB } from "../components/ButtonComponent";
import { getItem } from "../API/FetchAPI";
import { useState, useEffect } from "react";

const FavoritePage = () => {
  const [page, setPage] = useState<number>(18);
  const [isData, setIsData] = useState<any[]>([]);
  const [buttonOption, setButtonOption] = useState<string>("");
  const handleSelect = () => {
    if (buttonOption === "select") {
      return setButtonOption("");
    }
    setButtonOption("select");
  };
  const handleAllSelect = () => {
    if (buttonOption === "allSelect") {
      return setButtonOption("");
    }
    setButtonOption("allSelect");
  };
  const handleAllDelete = () => {
    if (buttonOption === "allDelete") {
      return setButtonOption("");
    }
    setButtonOption("allDelete");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getItem(
          `http://15.164.84.204:8080/items?page_number=1&page_size=${page}`,
        );
        setIsData(result.items);
      } catch (error) {
        alert(`데이터 불러오기를 실패했습니다.${error}`);
      }
    };

    fetchData();
  }, [page]);
  return (
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
          <button
            className={buttonOption === "allDelete" ? "onclick" : "unclick"}
            onClick={handleAllDelete}
          >
            전체상품 삭제
          </button>
        </div>
      </div>
      <div className="itemcontainer">
        <ul>
          {/* {buttonOption === 'select' ? } */}
          {isData.slice(0, 6).map((el, index) => (
            <li key={index}>
              <DeleteItemCard cardData={el} />
            </li>
          ))}

          {/* ------------------------------------------- */}
          {/* //삼항연산자 여러조건 사용시
  const result =
    condition1
    ? '첫 번째 조건'
    : condition2
    ? '두 번째 조건'
    : '세 번째 조건';

   위의 코드에서 condition1이 참이면 '첫 번째 조건이 참'을 반환하고,
   그렇지 않으면 condition2가 참이면 '두 번째 조건이 참'을 반환하며,
   그렇지 않으면 '세 번째 조건이 참'을 반환 */}
        </ul>
      </div>
      <div className="bottomButton">
        <button>더보기</button>
        <button>전체상품 보러가기</button>
      </div>
    </FavoritePageContainer>
  );
};

export default FavoritePage;
