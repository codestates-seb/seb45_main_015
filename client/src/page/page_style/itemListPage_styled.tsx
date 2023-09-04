import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

const ItemListPageContainer = styled.div`
  width: 100%;

  & .listPageCarousel {
    width: 100%;
    height: 750px;
    background: purple;
  }
  & .mainListcontainer {
    width: 100%;
    display: flex;
  }
  & .contentWrap {
    width: 100%;
    border-left: 1px solid ${globalTokens.heart.default.value};
  }
  & .content {
    margin-left: 130px;
    border: 1px solid red;
  }
  & .content > div {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  & .content:nth-child() > div {
    justify-content: space-around;
  }
  & .contenTitle {
    margin-top: 40px;
    font-size: 1.8rem;
  }
`;

export default ItemListPageContainer;
