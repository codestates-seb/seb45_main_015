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
  const [tradeStatus, setTradeStatus] = useState("");
  const { data, isLoading } = useMyTrade(tradeStatus);

  return (
    <TradePageContainer>
      <TradeNav statusChanger={setTradeStatus} />
      <TradeList>
        <TradeTitle>나의 거래</TradeTitle>
        <div id="trade-list-contents">
          {/* FIXME : KEY 추가 */}
          {data.items.length === 0 ? (
            <h1>거래한 내역이 없습니다</h1>
          ) : (
            data.items.map((item: any) => <ItemListCard {...item} />)
          )}
        </div>
      </TradeList>
    </TradePageContainer>
  );
};

export default MyTrade;
