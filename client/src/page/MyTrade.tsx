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
  const initialItemCard: MyTradeType = {
    items: {
      seller_id: 0,
      seller_nickname: "",
      buyer_id: null,
      buyer_nickname: null,
      item_id: 0,
      status: "",
      title: "",
      content: "",
      end_time: "",
      category: "",
      item_image_urls: [],
      start_price: 0,
      bid_unit: 0,
      current_price: 0,
      buy_now_price: 0,
      in_wish_list: false,
    },
  };
  const [itemCard, setItemCard] = useState({});
  const { data, isLoading } = useMyTrade();

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
