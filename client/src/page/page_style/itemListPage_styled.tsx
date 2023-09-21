import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

const ItemListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 1024px) {
  }

  & .listPageCarousel {
    width: 100%;
  }
  & .mainListcontainer {
    width: 100%;
    display: flex;
    @media (max-width: 1024px) {
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
    @media (max-width: 1024px) {
      border: none;
    }
  }
  & .content {
    width: 100%;
  }
  & .content > div > ul {
    padding: 0;
    margin: 0;
    display: grid;
    justify-items: center;
    flex-wrap: wrap;
    list-style: none;

    @media (min-width: 0px) {
      grid-template-columns: repeat(2, auto);
      transition: 500ms;
    }
    @media (min-width: 624px) {
      grid-template-columns: repeat(3, auto);
      transition: 500ms;
    }
    @media (min-width: 1485px) {
      grid-template-columns: repeat(3, auto);
      transition: 500ms;
    }
  }

  & .content:nth-child() > div {
    justify-content: space-around;
  }
  & .contenTitle {
    margin-top: 60px;
    padding-left: 35px;
    font-size: 38px;

    @media (max-width: 1024px) {
      padding-left: 0;
      margin-top: 48px;
    }

    @media (max-width: 1280px) {
      font-size: 28px;
    }
  }
  & .moreButton {
    width: 340px;
    height: 48px;
    margin: 100px 0;

    @media (max-width: 1280px) {
      margin: 60px 0;
    }
  }
`;

export default ItemListPageContainer;
