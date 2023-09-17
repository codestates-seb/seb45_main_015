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

const MyTrade: React.FC = () => {
  const { data, isLoading } = useMyTrade();

  return (
    <TradePageContainer>
      <TradeNav />
      <TradeList>
        {isLoading ? (
          <Loading />
        ) : (
          // data.map(item => {
          //   return (
          //     <>
          //       <TradeTitle>나의 거래</TradeTitle>
          //       <ItemListCard item={item} />;
          //     </>
          //   );
          // })
          ""
        )}
      </TradeList>
    </TradePageContainer>
  );
};

export default MyTrade;
