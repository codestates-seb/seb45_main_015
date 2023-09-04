import React, { useState } from "react";
import CategoryNav from "./components_style/MainCategory_style";

function CategorySideVar() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (index: number) => {
    setSelectedCategory(index);
  };

  const categoryList: string[] = [
    "전체보기",
    "패션의류/잡화",
    "뷰티",
    "출산/유아동",
    "식품",
    "주방용품",
    "생활용품",
    "홈인테리어",
    "가전디지털",
    "스포츠/레저",
    "자동차용품",
    "도서/음반/DVD",
    "완구/취미",
    "문구/오피스",
    "반려동물용품",
    "헬스/건강식품",
  ];
  return (
    <CategoryNav>
      <h2>카테고리</h2>
      <ul>
        {categoryList.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategoryClick(index)}
            style={{
              color: selectedCategory === index ? "#0064FF" : "",
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </CategoryNav>
  );
}

export default CategorySideVar;
