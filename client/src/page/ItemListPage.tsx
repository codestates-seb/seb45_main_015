import React, { useEffect, useState } from "react";
import ItemListPageContainer from "./page_style/itemListPage_styled";
import MainCategory from "../components/MainCategory";
import MyCarousel from "../components/Carousel";
import { ItemCard } from "../components/ItemCard";
import { MediumButtonB } from "../components/ButtonComponent";
import { getItem } from "../API/FetchAPI";
import { useQuery } from "@tanstack/react-query";

const carouselItems = [
  {
    imageUrl:
      "https://i.pinimg.com/564x/1c/72/93/1c7293afa416f1a1a51c3c723536bba9.jpg",
    caption: "Image 1",
  },
  {
    imageUrl:
      "https://i.pinimg.com/564x/6c/b3/3a/6cb33ac0c0a2c5942d007014da8c6c44.jpg",
    caption: "Image 2",
  },
  {
    imageUrl:
      "https://i.pinimg.com/564x/dd/bf/38/ddbf38f2067578c9da22378a83eaddb3.jpg",
    caption: "Image 3",
  },
];

const ItemListPage: React.FC = () => {
  const [page, setPage] = useState<number>(18);

  const handleLoadMore = () => {
    setPage(page + 18);
  };
  const handleItemRefetch = () => {
    refetch();
  };

  const getData = async () => {
    const result = await getItem(page);
    return result;
  };

  const { data, isLoading, isError, refetch } = useQuery(["itemList"], getData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{`Error fetching data ${isError}`}</div>;
  }
  return (
    <ItemListPageContainer>
      <div className="listPageCarousel">
        <MyCarousel items={carouselItems} />
      </div>
      <div className="mainListcontainer">
        <MainCategory />
        <div className="contentWrap">
          <div className="content">
            <h2 className="contenTitle">추천 상품 TOP6</h2>
            <div>
              <ul>
                {data.slice(0, 6).map((el: any, index: number) => (
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
          <div className="content">
            <h2 className="contenTitle">인기 상품 TOP6</h2>
            <div>
              <ul>
                {data.slice(6, 12).map((el: any, index: number) => (
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
          <div className="content">
            <h2 className="contenTitle">전체 상품</h2>
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

export default ItemListPage;
