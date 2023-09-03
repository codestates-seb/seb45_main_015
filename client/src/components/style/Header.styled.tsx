import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 89px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  height: auto;
  margin: 0 160px;

  @media (max-width: 768px) {
    & {
      justify-content: space-between;
      margin: 0 20px;
    }
  }
`;

export const LogoWrapper = styled.div`
  width: 237px;
  height: 48px;
  padding-right: 42px;
  border-right: solid 1px ${globalTokens.heart.default.value};

  @media (max-width: 768px) {
    & {
      border-style: none;
    }
  }
`;

export const Logo = styled.img`
  background-color: #e6e8ec;
  width: 195px;
  height: 48px;
`;

export const NavWrapper = styled.div`
  display: flex;
  margin-left: 42px;

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 0;
  border-style: none;
  background-color: #fff;
  font-size: 18px;
  color: #777e90;
  font-family: "Gmarket Sans";
  white-space: nowrap;
  transition: 0.5s ease-out;
  padding: 12px;

  &:hover {
    transition: 0.5s ease-out;
    color: ${globalTokens.Button.default.value};
  }

  &.Icon {
    font-size: 28px;
    margin-left: 10px;
  }

  &.screen-1024px {
    display: none;
    font-size: 24px;
  }

  &.screen-768px {
    display: none;
    font-size: 36px;
  }

  @media (max-width: 1024px) {
    &.screen-1024px {
      display: block;
    }
  }

  @media (max-width: 768px) {
    &.screen-768px {
      display: block;
    }
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;
  padding: 0 15px 0 15px;

  @media (max-width: 1024px) {
    & {
      display: none;
    }
  }
`;

export const SearchForm = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border: solid 1px #777e90;
  border-radius: 45px;
  padding-right: 15px;
`;

export const Search = styled.input`
  outline: none;
  border-style: none;
  background-color: transparent;
  width: 100%;
  padding: 15px 5px 15px 15px;
  font-size: 16px;
`;

export const SearchButton = styled.button`
  cursor: pointer;
  display: flex;
  border-style: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: #777e90;
`;

export const UserWrapper = styled.div`
  display: flex;
  margin-left: 15px;

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
`;
