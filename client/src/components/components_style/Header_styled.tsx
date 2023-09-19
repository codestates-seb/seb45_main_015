import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  z-index: 1000;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1120px;
  margin: 15px 320px;

  @media (max-width: 768px) {
    & {
      margin: 15px 0;
    }
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;

  & > a {
    margin-right: 31px;
  }

  @media (max-width: 768px) {
    & {
      justify-content: space-between;
      padding: 0 15px;
    }
  }
`;

export const LogoWrapper = styled.div`
  width: 150px;
  height: 50px;
  margin: 0 5px;
`;

export const Logo = styled.img`
  background-color: #e6e8ec;
  width: 100%;
  height: 100%;
`;

export const NavWrapper = styled.div`
  display: flex;

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border-style: none;
  background-color: #fff;
  font-size: 18px;
  color: #777e90;
  padding: 11px;
  white-space: nowrap;
  transition: 0.5s ease-out;

  &:hover {
    transition: 0.5s ease-out;
    color: ${globalTokens.Button.default.value};
  }

  &.header-icon {
    line-height: 0;
    width: 44px;
    height: 44px;
    font-size: 22px;
  }

  &.header-dropdown {
    cursor: default;
  }

  &.header-screen-1024px {
    display: none;
    font-size: 18px;
  }

  &.search-icon {
    font-size: 26px;
    width: 55px;
    height: 55px;
  }

  &.hamburger-icon {
    font-size: 32px;
    width: 55px;
    height: 55px;
  }

  @media (max-width: 1024px) {
    &.header-screen-1024px {
      display: block;
    }
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;
  min-width: 100px;
  margin-left: 11px;

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
  height: 44px;
  background-color: transparent;
  border: solid 1px #777e90;
  border-radius: 45px;

  &:focus-within {
    background: #ffffff;
    border: 1px solid #0064ff;
  }
`;

export const Search = styled.input`
  outline: none;
  border-style: none;
  background-color: transparent;
  width: 100%;
  font-size: 18px;
  margin: 0 10px;
`;

export const SearchButton = styled.button`
  cursor: pointer;
  display: flex;
  border-style: none;
  background-color: transparent;
  margin-right: 15px;
  padding: 0;
  font-size: 18px;
  color: #777e90;
  transition: 0.5s ease-out;

  &:hover {
    transition: 0.5s ease-out;
    color: ${globalTokens.Button.default.value};
  }
`;

export const UserWrapper = styled.div`
  display: flex;

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
`;

export const HamburgerWrapper = styled.div`
  display: none;
  align-items: center;

  @media (max-width: 768px) {
    & {
      display: flex;
    }
  }
`;
