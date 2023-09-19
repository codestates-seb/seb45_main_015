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
  margin-top: 103px;

  @media (max-width: 1230px) {
    margin-top: 40px;
    height: 100px;
    max-width: 832px;
    align-items: center;
  }

  & > ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;

    list-style: none;

    @media (max-width: 1230px) {
      flex-direction: row;
      justify-content: center;
      width: 100%;
      gap: 50px;
      padding: 0;
    }
    @media (max-width: 1020px) {
      flex-direction: row;
      justify-content: center;
      width: 100%;
      gap: 30px;
      padding: 0;
    }
  }

  & > ul > li {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 15px;
    color: #635c5c;

    @media (max-width: 1230px) {
      width: fit-content;
      justify-content: unset;
      font-size: 18px;
    }
    @media (max-width: 1020px) {
      font-size: 16px;
    }
  }

  & > ul > li:hover {
    color: #0056b3;
    cursor: pointer;
  }

  & > ul > li > .bell-icon {
    font-size: 15px;
    margin-right: 10px;

    @media (max-width: 1230px) {
      display: none;
    }
  }
`;

export default TradeNav;
