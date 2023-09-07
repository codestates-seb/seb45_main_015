import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import TradeNav from "./components_style/TradeNav_styled";

function TradeSideVar() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
  };

  const TradeList: string[] = [
    "내가 등록한 물건",
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
            <FontAwesomeIcon icon={faBell} className="bell-icon" />
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </TradeNav>
  );
}
// --------------------------------------------------------------------------------------------------------
export default TradeSideVar;
