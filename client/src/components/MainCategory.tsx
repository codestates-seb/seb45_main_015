import React, { useState, useEffect } from "react";
import CategoryNav from "./components_style/MainCategory_styled";
import { Link } from "react-router-dom";
import { getCategory } from "../API/FetchAPI";

function CategorySideVar() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [data, setData] = useState([] as { id: number; name: string }[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategory();
        setData(response);
      } catch (error) {
        alert(`데이터 불러오기를 실패했습니다.${error}`);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (index: number) => {
    setSelectedCategory(index);
  };

  return (
    <CategoryNav>
      <h2>카테고리</h2>
      <div className="categoryWrap">
        <ul>
          {data
            .sort((a, b) => a.id - b.id)
            .map((category, index) => (
              <Link
                to={category.id === 1 ? "/allList" : `/category/${category.id}`}
              >
                <li
                  key={index}
                  onClick={() => handleCategoryClick(index)}
                  style={{
                    color: selectedCategory === index ? "#0064FF" : "",
                    fontWeight: selectedCategory === index ? "bold" : "normal",
                  }}
                >
                  {category.name}
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </CategoryNav>
  );
}

export default CategorySideVar;
