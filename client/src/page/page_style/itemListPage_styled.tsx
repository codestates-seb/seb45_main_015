import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

const ItemListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 1209px) {
  }

  & .listPageCarousel {
    width: 100%;
  }
  & .mainListcontainer {
    width: 100%;
    display: flex;
    @media (max-width: 1209px) {
      flex-direction: column;
    }
  }
  & .contentWrap {
    width: 100%;
    border-left: 1px solid ${globalTokens.heart.default.value};
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    @media (max-width: 950px) {
      border: none;
    }
  }
  & .content {
    width: 100%;
  }
  & .content > div > ul {
    display: grid;
    justify-items: center;
    flex-wrap: wrap;
    list-style: none;

    @media (min-width: 0px) {
      grid-template-columns: repeat(2, auto);
    }
    @media (min-width: 1025px) {
      grid-template-columns: repeat(3, auto);
    }
    @media (min-width: 1210px) {
      grid-template-columns: repeat(2, auto);
    }
    @media (min-width: 1485px) {
      grid-template-columns: repeat(3, auto);
    }
  }
  & .content:nth-child() > div {
    justify-content: space-around;
  }
  & .contenTitle {
    margin-top: 40px;
    padding-left: 35px;
    font-size: 1.8rem;
  }
  & .moreButton {
    width: 340px;
    height: 48px;
    margin-top: 100px;
  }
`;

export default ItemListPageContainer;
