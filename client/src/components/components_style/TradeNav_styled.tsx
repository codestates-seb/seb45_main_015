import styled from "styled-components";

const TradeNav = styled.div`
  width: 236px;
  border-radius: 16px;
  border: 1px solid #d9dadb;
  background: #fcfcfd;
  margin: 100px 0;
  & ul {
    padding: 0;
    display: flex;
    padding: 48px 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }

  & li {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 160px;
    height: 14px;
    gap: 16px;
    cursor: pointer;
  }

  & li p {
    line-height: 16p;
    color: #777e90;
    font-family: Gmarket Sans TTF;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    list-style: none;
    padding-top: 2px;
  }
  & li p:hover {
    color: #0056b3;
  }

  & .bell-icon {
    width: 16px;
    height: 16px;
    color: #777e90;
  }
`;

export default TradeNav;
