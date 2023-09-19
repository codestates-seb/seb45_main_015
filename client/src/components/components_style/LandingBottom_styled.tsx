import styled from "styled-components";

export const LandingBottomBox = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .member {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .BEmember {
    margin-top: 50px;
  }
  & .person {
    display: flex;
    margin-bottom: 40px;
    justify-content: space-around;
  }
  & .BEskill {
    width: 100%;
    display: grid;
    justify-items: center;
    @media (min-width: 0px) {
      grid-template-columns: repeat(2, auto);
      transition: 500ms;
    }
    @media (min-width: 1025px) {
      grid-template-columns: repeat(3, auto);
      transition: 500ms;
    }
    @media (min-width: 1210px) {
      grid-template-columns: repeat(3, auto);
      transition: 500ms;
    }
    @media (min-width: 1485px) {
      grid-template-columns: repeat(3, auto);
      transition: 500ms;
    }
  }
  & .itemBox {
    width: 200px;
    margin-bottom: 60px;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  & .itemBox img {
    height: 104px;
  }
  & .person p {
    font-weight: bold;
  }
  & .FEmember {
    margin-top: 50px;
  }
  & .FEskill {
    display: grid;
    justify-items: center;
    @media (min-width: 0px) {
      grid-template-columns: repeat(2, auto);
      transition: 500ms;
    }
    @media (min-width: 1025px) {
      grid-template-columns: repeat(3, auto);
      transition: 500ms;
    }
    @media (min-width: 1210px) {
      grid-template-columns: repeat(3, auto);
      transition: 500ms;
    }
    @media (min-width: 1485px) {
      grid-template-columns: repeat(4, auto);
      transition: 500ms;
    }
  }
`;
