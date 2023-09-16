import React, { useState } from "react";
import ItemListPageContainer from "./page_style/itemListPage_styled";
import MainCategory from "../components/MainCategory";
import { ItemCard } from "../components/ItemCard";
import { MediumButtonB } from "../components/ButtonComponent";
import { getCategoryItem } from "../API/FetchAPI";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CategoryListPage: React.FC = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(18);

  const handleItemRefetch = () => {
    refetch();
  };

  const getData = async () => {
    const result = await getCategoryItem(page, Number(id));
    return result;
  };
  const { data, isLoading, isError, refetch } = useQuery(
    ["categoryItemList", id, page],
    getData,
    {
      keepPreviousData: true,
    },
  );

  const handleLoadMore = () => {
    setPage(page + 18);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <ItemListPageContainer>
      <div className="mainListcontainer">
        <MainCategory />
        <div className="contentWrap">
          <div className="content">
            <h2 className="contenTitle">
              {data.length > 0 ? data[0].category : "매물이 없습니다"}
            </h2>
            <div>
              <ul>
                {data.slice(0, 6).map((el: any, index: number) => (
                  <li key={index}>
                    <ItemCard
                      cardData={el}
                      favoriteState={false}
                      onItemRefetch={handleItemRefetch}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="moreButton">
            {data.length > 0 ? (
              <MediumButtonB onClick={handleLoadMore} value={"더보기"} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </ItemListPageContainer>
  );
};

export default CategoryListPage;
