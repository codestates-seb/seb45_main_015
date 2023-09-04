import React, { useState } from "react";
import TradeNav from "./components_style/TradeNav_style";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

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
          <Link to={`TradeNav_${category}`}>
            <li key={index} onClick={() => handleMenuClick(index)}>
              <FontAwesomeIcon className="bell-icon" icon={faBell} />
              <p
                style={{
                  color: selectedMenu === index ? "#0064FF" : "",
                }}
              >
                {category}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </TradeNav>
  );
}

export default TradeSideVar;
