import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

const ItemListPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  & .listPageCarousel {
    width: 100%;
    margin: 0 160px 0 160px;
  }
  & .mainListcontainer {
    width: 100%;
    display: flex;
  }
  & .contentWrap {
    width: 100%;
    border-left: 1px solid ${globalTokens.heart.default.value};
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .content {
    width: 100%;
  }
  & .content > div {
    display: grid;
    justify-items: center;
    flex-wrap: wrap;

    @media (min-width: 0px) {
      grid-template-columns: repeat(1, auto);
    }
    @media (min-width: 260px) {
      grid-template-columns: repeat(2, auto);
    }
    @media (min-width: 530px) {
      grid-template-columns: repeat(2, auto);
    }
    @media (min-width: 1050px) {
      grid-template-columns: repeat(4, auto);
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
  & .buttontest {
    width: 340px;
    height: 60px;
    margin-top: 100px;
  }
  & .PAGE {
    width: 50px;
    height: 50px;
  }
`;

export default ItemListPageContainer;
