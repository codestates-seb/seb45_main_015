import styled from "styled-components";

export const TradePageContainer = styled.section`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 84px;
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 1230px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
export const TradeTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 35px;
`;

export const TradeList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 5px;
  overflow: scroll;

  @media (max-width: 1230px) {
    margin-bottom: 30px;
  }
`;
