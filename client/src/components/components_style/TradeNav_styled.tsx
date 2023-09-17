import styled from "styled-components";

const TradeNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 336px;
  border: 1px solid #d9dadb;
  background: #fcfcfd;
  border-radius: 16px;
  margin-top: 30px;

  & > ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    list-style: none;
  }

  & > ul > li {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 15px;
    color: #635c5c;
  }

  & > ul > li:hover {
    color: #0056b3;
    cursor: pointer;
  }

  & > ul > li > .bell-icon {
    font-size: 15px;
    margin-right: 10px;
  }
`;

export default TradeNav;
