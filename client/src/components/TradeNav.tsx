import React, { useState } from "react";
import TradeNav from "./components_style/TradeNav_style";

function TradeSideVar() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
  };

  const TradeList: string[] = [
    "입찰 진행중",
    "거래중",
    "유찰된 거래",
    "거래완료",
  ];
  return (
    <TradeNav>
      <ul>
        {TradeList.map((category, index) => (
          <li key={index} onClick={() => handleMenuClick(index)}>
            <div className="img"></div>
            <p
              style={{
                color: selectedMenu === index ? "#0064FF" : "",
              }}
            >
              {category}
            </p>
          </li>
        ))}
      </ul>
    </TradeNav>
  );
}

export default TradeSideVar;
