import React, { useState } from "react";

import { useMyTrade } from "../API/FetchAPI";
import TradeNav from "../components/TradeNav";
import {
  TradePageContainer,
  TradeList,
  TradeTitle,
} from "./page_style/MyTrade_styled";
import ItemListCard from "../components/ItemListCard";
import Loading from "../loading/Loading";
import { MyTradeType } from "../type/type";

const MyTrade: React.FC = () => {
  const { data, isLoading } = useMyTrade();

  return (
    <TradePageContainer>
      <TradeNav />
      <TradeList>
        <TradeTitle>나의 거래</TradeTitle>
        {isLoading ? (
          <h1>거래한 내역이 없습니다</h1>
        ) : (
          data.items.map((item: any) => <ItemListCard {...item} />)
        )}
      </TradeList>
    </TradePageContainer>
  );
};

export default MyTrade;
