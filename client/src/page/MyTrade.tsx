import React from "react";

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
  console.log(data);

  return (
    <TradePageContainer>
      <TradeNav />
      <TradeList>
        <TradeTitle>나의 거래</TradeTitle>
        {isLoading ? (
          <Loading />
        ) : (
          data.items.map((item: MyTradeType) => (
            <ItemListCard items={item.items} />
          ))
        )}
      </TradeList>
    </TradePageContainer>
  );
};

export default MyTrade;
