import styled from "styled-components";

export const LandingMiddeBox = styled.div`
  width: 100%;
  margin-top: 75px;
  @media (max-width: 1395px) {
    margin-top: -200px;
  }
  @media (max-width: 650px) {
    margin-top: -300px;
  }
  @media (max-width: 450px) {
    margin-top: 0px;
  }
  & .section {
    text-align: center;
    margin-top: 200px;
    border-top: 1px solid #d9d9d9;
  }
  & .popular {
    margin-top: 100px;
  }
  & .section > div > h2 {
    margin-bottom: 100px;
  }
  & .categoryWrap {
    display: grid;
    justify-items: center;
    flex-wrap: wrap;
    list-style: none;

    @media (min-width: 0px) {
      grid-template-columns: repeat(2, auto);
      transition: 500ms;
    }
    @media (min-width: 1025px) {
      grid-template-columns: repeat(3, auto);
      transition: 500ms;
    }
    @media (min-width: 1210px) {
      grid-template-columns: repeat(4, auto);
      transition: 500ms;
    }
    @media (min-width: 1485px) {
      grid-template-columns: repeat(5, auto);
      transition: 500ms;
    }
  }
  & .popular {
    margin-top: 200px;
  }
  & .popularWrap {
    display: flex;
    width: 100%;
  }
  & .popularWrap ul {
    list-style: none;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-left: 0;
  }
  & .popularWrap ul li {
    display: flex;
    justify-content: space-around;
  }
  & .categotyItem {
    margin-bottom: 50px;
  }
`;
