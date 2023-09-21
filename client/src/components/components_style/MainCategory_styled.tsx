import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

const CategoryNav = styled.div`
  width: 187px;
  margin-right: 10px;
  color: black;
  @media (max-width: 1024px) {
    width: 100%;
  }
  & .categoryWrap {
    width: 100%;
    @media (max-width: 1024px) {
      overflow-x: auto;
      white-space: nowrap;
      border-bottom: 1px solid ${globalTokens.heart.default.value};
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #808080;
        border-radius: 10px;
        background-clip: padding-box;
        border: 3px solid transparent;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    }
  }
  & h2 {
    margin-top: 48px;
    margin-bottom: 0;
    font-size: 24px;
    font-weight: 700;
  }

  & ul {
    padding: 0;
    width: 100%;
  }

  & li {
    height: 56px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: #000;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    @media (max-width: 1024px) {
      display: inline-block;
      margin-right: 30px;
      font-size: 15px;
      height: 28px;
      padding: 5px;
    }
  }

  & li:hover {
    color: #0056b3;
  }
  @media (max-width: 1024px) {
    display: block;
  }
`;

export default CategoryNav;
