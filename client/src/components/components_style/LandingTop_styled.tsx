import styled from "styled-components";
export const LandingTopbox = styled.div`
  width: 100%;
  margin-top: 75px;
  & .first_Content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }
  & .Logo {
    width: 40%;
  }
  & .textBox {
    width: 60%;
    & h1 {
      font-size: 7rem;
      @media (max-width: 1395px) {
        font-size: 4rem;
      }
    }
    & p {
      width: 70%;
      margin-bottom: 30px;
      @media (max-width: 1395px) {
        font-size: 0.8rem;
      }
    }
  }
  & .first_Content_button {
    width: 192px;
    height: 48px;
  }
  & .second_content {
    left: 0;
    margin-top: 100px;
    margin-bottom: 1300px;
    @media (max-width: 1050px) {
      margin-bottom: 0px;
    }
    @media (max-width: 450px) {
      display: none;
    }
    @media (max-width: 1325px) {
      margin-bottom: 1100px;
    }
  }
  & .second_content > img {
    margin: 0;
  }
  & .firsfImg {
    float: left;
    margin-top: 23px;
    @media (max-width: 1395px) {
      width: 100%;
    }
  }
  & .secondImg {
    float: right;
    margin-top: 23px;
    @media (max-width: 1395px) {
      width: 100%;
    }
  }
  & .thirdImg {
    float: left;
    margin-top: 23px;
    @media (max-width: 1395px) {
      width: 100%;
    }
  }
`;
