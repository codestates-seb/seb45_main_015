import React from "react";
import TradeNav from "../components/TradeNav";
import {
  TradePageContainer,
  TradeList,
  TradeTitle,
} from "./page_style/MyTrade_styled";
import ItemListCard from "../components/ItemListCard";

const MyTrade: React.FC = () => {
  return (
    <TradePageContainer>
      <TradeNav />
      <TradeList>
        <TradeTitle>나의 거래</TradeTitle>
        <ItemListCard />
        <ItemListCard />
        <ItemListCard />
        <ItemListCard />
        <ItemListCard />
        <ItemListCard />
        <ItemListCard />
        <ItemListCard />
        <ItemListCard />
      </TradeList>
    </TradePageContainer>
  );
};

export default MyTrade;
