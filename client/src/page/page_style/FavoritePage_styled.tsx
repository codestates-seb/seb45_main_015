import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

const FavoritePageContainer = styled.div`
  border: 1px solid red;

  & .topButtonWrap {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }
  /* & .content > div > ul {
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
  } */

  & .topButton {
    width: 120px;
    height: 40px;
    margin-right: 24px;
  }
  & .topButton > button {
    width: 120px;
    height: 40px;
    margin-right: 24px;
    border-radius: 90px;
    border: 2px solid ${globalTokens.Button.default.value};
    font-size: 14px;
    cursor: pointer;
  }
  & .onclick {
    background: ${globalTokens.Button.default.value};
    color: white;
  }
  & .unclick {
    background: white;
    color: ${globalTokens.Button.default.value};
  }

  & .itemcontainer {
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
      grid-template-columns: repeat(3, auto);
    }
    @media (min-width: 1050px) {
      grid-template-columns: repeat(4, auto);
    }
  }
`;

export default FavoritePageContainer;
