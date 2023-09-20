import styled from "styled-components";

export const TradePageContainer = styled.section`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 84px;
  width: 100%;
  height: 100vh;
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
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #808080;
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  & > #trade-list-contents {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 5px;
    overflow-y: scroll;
  }

  @media (max-width: 1230px) {
    margin-bottom: 30px;
  }
`;
