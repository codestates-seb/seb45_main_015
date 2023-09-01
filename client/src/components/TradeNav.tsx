import React, { useState } from "react";
import TradeNav from "./component_style/TradeNav_style";

function TradeSideVar() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  const categoryList: string[] = [
    "입찰 진행중",
    "거래중",
    "유찰된 거래",
    "거래완료",
  ];
  return (
    <TradeNav>
      <ul>
        {categoryList.map((category, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(index)}
            style={{
              color: selectedItem === index ? "#0064FF" : "",
            }}
          >
            <div className="img"></div>
            <p>{category}</p>
          </li>
        ))}
      </ul>
    </TradeNav>
  );
}

export default TradeSideVar;
