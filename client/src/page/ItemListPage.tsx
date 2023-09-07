import React, { useEffect, useState } from "react";
import ItemListPageContainer from "./page_style/itemListPage_styled";
import { Link } from "react-router-dom";
import MainCategory from "../components/MainCategory";
import MyCarousel from "../components/Carousel";
import ItemCard from "../components/ItemCard";
import { MediumButtonB } from "../components/ButtonComponent";
import { getItem } from "../API/FetchAPI";

const ItemListPage: React.FC = () => {
  const [isData, setIsData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getItem(
          "http://15.164.84.204:8080/items?page_number=1&page_size=18",
        );
        setIsData(result.items);
      } catch (error) {
        alert(`데이터 불러오기를 실패했습니다.${error}`);
      }
    };

    fetchData();
  }, []);

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
                {isData.slice(0, 6).map((el, index) => (
                  <li key={index}>
                    <ItemCard cardData={el} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="content">
            <h2 className="contenTitle">인기 상품 TOP6</h2>
            <div>
              <ul>
                {isData.slice(0, 6).map((el, index) => (
                  <li key={index}>
                    <ItemCard cardData={el} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="content">
            <h2 className="contenTitle">전체 상품</h2>
            <div>
              <ul>
                {isData.map((el, index) => (
                  <li key={index}>
                    <ItemCard cardData={el} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="moreButton">
            <MediumButtonB value={"더보기"} />
          </div>
        </div>
      </div>
    </ItemListPageContainer>
  );
};

export default ItemListPage;
