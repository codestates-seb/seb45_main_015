import FavoritePageContainer from "./page_style/FavoritePage_styled";
import { Link } from "react-router-dom";
import { DeleteItemCard } from "../components/ItemCard";
import { SmallButtonB, SmallButtonD } from "../components/ButtonComponent";
import { getFavorite, deleteItem } from "../API/FetchAPI";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Loading from "../loading/Loading";

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

const FavoritePage: React.FC = () => {
  const [page, setPage] = useState<number>(100); //찜목록100개 불러오기
  const [selectMode, setSelectMode] = useState<boolean>(false); //선택모드
  const [buttonOption, setButtonOption] = useState<string>("delete"); //현재 선택된버튼
  const [deleteList, setDeleteList] = useState<number[]>([]); //체크된목록

  //찜목록 선택항목 추가or삭제--------------------
  const handledAddOrDeleteId = (newId: number) => {
    if (deleteList.includes(newId)) {
      const result = deleteList.filter(el => {
        return el !== newId;
      });
      return setDeleteList(result);
    } else {
      setDeleteList([...deleteList, newId]);
    }
  };

  //찜목록 선택 옵션(선택모드,전체선택,전체삭제) --------------
  const handleItemRefetch = () => {
    refetch();
  };

  //선택모드
  const handleSelect = () => {
    if (buttonOption === "select") {
      setButtonOption("delete");
      setSelectMode(false);
      setDeleteList([]);
    } else if (buttonOption === "allSelect") {
      setButtonOption("select");
      setSelectMode(true);
      setDeleteList([]);
    } else {
      setButtonOption("select");
      setSelectMode(true);
      setDeleteList([]);
    }
  };

  //전체선택
  const handleAllSelect = () => {
    if (buttonOption === "allSelect") {
      const selectedItems = data.map((el: objTest) => el.item_id);
      setDeleteList(selectedItems);
      setButtonOption("delete");
      setSelectMode(false);
      setDeleteList([]);
    } else if (buttonOption === "select") {
      const selectedItems = data.map((el: objTest) => el.item_id);
      setDeleteList(selectedItems);
      setButtonOption("allSelect");
      setSelectMode(true);
    } else {
      const selectedItems = data.map((el: objTest) => el.item_id);
      setDeleteList(selectedItems);
      setButtonOption("allSelect");
      setSelectMode(true);
    }
  };
  useEffect(() => {
    console.log(deleteList);
  }, [deleteList]);

  //선택항목 삭제
  const selectDelete = async () => {
    const result = await deleteItem(deleteList);
    return result;
  };
  const { mutate: deleteSelectMutate } = useMutation(
    ["deleteItem"],
    selectDelete,
    {
      onSuccess: () => {
        setDeleteList([]);
        refetch();
      },
    },
  );
  const handleSelectDelete = () => {
    deleteSelectMutate();
  };

  //전체삭제
  const allFavoriteItemId = async () => {
    const result = await getFavorite(page);
    const all_Id = result.wishes.map((el: objTest) => {
      return el.item_id;
    });
    console.log(all_Id);
    return all_Id;
  };
  const deleteData = async () => {
    const result = await deleteItem(await allFavoriteItemId());
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

  //더보기
  const moreFavoriteItem = () => {
    setPage(page + 20);
  };

  const getData = async () => {
    const result = await getFavorite(page);
    return result.wishes;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["favoriteList"],
    getData,
    {
      keepPreviousData: true,
    },
  );

  if (isLoading) {
    return <Loading />;
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
        {buttonOption === "select" || buttonOption === "allSelect" ? (
          <div className="topButton">
            <button className="allDelete" onClick={handleSelectDelete}>
              선택상품 삭제
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="itemcontainer">
        <ul>
          {data.map((el: any, index: number) => (
            <li key={index}>
              <DeleteItemCard
                cardData={el}
                onItemRefetch={handleItemRefetch}
                buttonOption={buttonOption}
                selectMode={selectMode}
                handledAddOrDeleteId={handledAddOrDeleteId}
                checkList={deleteList}
              />
            </li>
          ))}
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
