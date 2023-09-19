import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

const CategoryNav = styled.div`
  width: 187px;
  margin-right: 10px;
  color: black;
  @media (max-width: 1209px) {
    width: 100%;
  }
  & .categoryWrap {
    width: 100%;
    @media (max-width: 1209px) {
      overflow-x: auto;
      white-space: nowrap;
      margin-bottom: 30px;
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
    margin: 48px 0 56px 0;
    font-size: 1.5rem;
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
    @media (max-width: 1209px) {
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
  @media (max-width: 1209px) {
    display: block;
  }
`;

export default CategoryNav;
