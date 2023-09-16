import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

const FavoritePageContainer = styled.div`
  & .topButtonWrap {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }

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
  & .topButton > button:hover {
    background: ${globalTokens.Button.default.value};
    color: white;
    cursor: pointer;
  }
  & .allDelete {
    background: white;
    color: ${globalTokens.Button.default.value};
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
  }
  & .itemcontainer > ul {
    margin: 0 auto;
    padding: 0;
    display: grid;
    justify-items: center;
    flex-wrap: wrap;
    list-style: none;

    @media (min-width: 0px) {
      grid-template-columns: repeat(2, auto);
    }
    @media (min-width: 1025px) {
      grid-template-columns: repeat(4, auto);
    }
    @media (min-width: 1210px) {
      grid-template-columns: repeat(3, auto);
    }
    @media (min-width: 1485px) {
      grid-template-columns: repeat(4, auto);
    }
  }
  & .noneItemContainer {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #808080;
  }

  & .noneFavorite {
    width: 40%;
    height: 40%;
  }
  & .bottomButton {
    display: flex;
    flex-direction: column;
    width: 25%;
    margin: 8% auto;
  }
  & .moreButton {
    height: 40px;
    margin-bottom: 30px;
  }
  & .PageButton {
    height: 40px;
  }
`;

export default FavoritePageContainer;
