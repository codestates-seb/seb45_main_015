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
  height: 75px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  z-index: 1000;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
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
  height: 44px;
  margin-right: 31px;
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
  height: 44px;
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
    font-size: 22px;
  }

  &.header-screen-1024px {
    display: none;
    font-size: 18px;
  }

  &.header-screen-768px {
    display: none;
    font-size: 36px;
  }

  @media (max-width: 1024px) {
    &.header-screen-1024px {
      display: block;
    }
  }

  @media (max-width: 768px) {
    &.header-screen-768px {
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
