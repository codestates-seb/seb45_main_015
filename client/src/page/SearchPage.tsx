import React, { useState } from "react";
import ItemListPageContainer from "./page_style/itemListPage_styled";
import MainCategory from "../components/MainCategory";
import { ItemCard } from "../components/ItemCard";
import { MediumButtonB } from "../components/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import { searchItem } from "../API/FetchAPI";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";

const SearchPage: React.FC = () => {
  const { keyWord } = useParams();
  const [page, setPage] = useState<number>(18);

  const handleLoadMore = () => {
    setPage(page + 18);
  };
  const handleItemRefetch = () => {
    refetch();
  };

  const getData = async () => {
    if (!keyWord) {
      return null;
    }
    const result = await searchItem(keyWord, page);
    return result.items;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["itemList", keyWord, page],
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
  return (
    <ItemListPageContainer>
      <div className="mainListcontainer">
        <MainCategory />
        <div className="contentWrap">
          <div className="content">
            <h2 className="contenTitle">
              {data.length ? `${keyWord} 검색결과` : "검색 결과가 없습니다."}
            </h2>
            <div>
              <ul>
                {data.map((el: any, index: number) => (
                  <li key={index}>
                    <ItemCard
                      cardData={el}
                      favoriteState={el.in_wish_list}
                      onItemRefetch={handleItemRefetch}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="moreButton">
            <MediumButtonB onClick={handleLoadMore} value={"더보기"} />
          </div>
        </div>
      </div>
    </ItemListPageContainer>
  );
};

export default SearchPage;
