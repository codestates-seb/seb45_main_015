import React, { useState } from "react";
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import TradeNav from "./components_style/TradeNav_styled";
<<<<<<< HEAD
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
=======
>>>>>>> 9febfbc (rename: 스타일 파일 이름 수정)
=======
=======
import TradeNav from "./components_style/TradeNav_style";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
>>>>>>> ed41009 (asd)
>>>>>>> 39bd68f (종회님+태수)

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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 39bd68f (종회님+태수)
          <li key={index} onClick={() => handleMenuClick(index)}>
            <FontAwesomeIcon icon={faBell} className="bell-icon" />
            <span>{category}</span>
          </li>
<<<<<<< HEAD
>>>>>>> 9c59d21 ([FE] design: 나의거래페에지 사이드바 스타일 수정)
=======
=======
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
>>>>>>> ed41009 (asd)
>>>>>>> 39bd68f (종회님+태수)
        ))}
      </ul>
    </TradeNav>
  );
}

export default TradeSideVar;
