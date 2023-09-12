import React, { useEffect, useState } from "react";
import ItemListPageContainer from "./page_style/itemListPage_styled";
import MainCategory from "../components/MainCategory";
import { ItemCard } from "../components/ItemCard";
import { MediumButtonB } from "../components/ButtonComponent";
import { getItem, getCategory } from "../API/FetchAPI";
import { useParams, Link } from "react-router-dom";

interface GetItemProperty {
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
}

const CategoryListPage: React.FC = () => {
  const { id } = useParams();
  const [isData, setIsData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categoryData = await getCategory();
        const categoryIdName = categoryData.filter(
          (el: { id: any; name: string }) => {
            return el.id == Number(id);
          },
        );
        const result = await getItem(
          `http://15.164.84.204:8080/items?page_number=1&page_size=${page}`,
        );
        setIsData(
          result.items.filter((el: GetItemProperty) => {
            return el.category === categoryIdName[0].name;
          }),
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert(`데이터 불러오기를 실패했습니다.${error}`);
      }
    };

    fetchData();
  }, [page, id]);

  const handleLoadMore = () => {
    setPage(page + 20);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ItemListPageContainer>
      <div className="mainListcontainer">
        <MainCategory />
        <div className="contentWrap">
          <div className="content">
            <h2 className="contenTitle">
              {isData.length > 0 ? isData[0].category : "매물이 없습니다"}
            </h2>
            <div>
              <ul>
                {isData.map((el, index) => (
                  <li key={index + 1}>
                    <ItemCard cardData={el} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="moreButton">
            {isData.length > 0 ? (
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
