import React, { useState } from "react";
import styled from "styled-components";

const MainSidebar = styled.div`
  width: 240px;
  border: 1px solid red;

  & h2 {
    margin: 48px 0 56px 0;
    font-family: "Gmarket Sans TTF";
    font-size: 28px;
    font-weight: 700;
  }

  & ul {
    border: 1px solid black;
    padding: 0;
  }

  & li {
    border: 1px solid green;
    height: 56px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: #000;
    font-family: "Gmarket Sans TTF";
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }

  & li:hover {
    color: #0056b3;
  }
`;

function Sidebar() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
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
    <MainSidebar>
      <h2>카테고리</h2>
      <ul>
        {categoryList.map((category, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(index)}
            style={{
              color: selectedItem === index ? "#0064FF" : "#000",
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </MainSidebar>
  );
}

export default Sidebar;
