import styled from "styled-components";

export const Container = styled.div`
  display: none;
  width: 100%;
  height: 100%;

  @media (max-width: 1024px) {
    & {
      display: flex;
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  padding: 45px 0 30px;
`;

export const SearchContent = styled.div`
  max-width: 400px;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  &.search-title-wrapper {
    justify-content: space-between;
    height: 40px;
    margin-bottom: 24px;
  }
`;

export const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 36px;
`;

export const Icon = styled.button`
  cursor: pointer;
  display: flex;
  padding: 0;
  height: 100%;
  border-style: none;
  background-color: transparent;
  transition: 0.5s ease-out;

  &.close-icon {
    font-size: 36px;
    margin-right: 10px;
  }

  &.search-icon {
    font-size: 24px;
  }

  &:hover {
    color: #0064ff;
    transition: 0.5s ease-out;
  }
`;

export const SearchForm = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  border-bottom: solid 2px #000;
  transition: 0.5s ease-out;

  &:focus-within {
    border-bottom: solid 2px #0064ff;
    transition: 0.5s ease-out;
  }
`;

export const SearchInput = styled.input`
  outline: none;
  width: 100%;
  height: 60px;
  padding: 10px 60px 10px 0;
  border-style: none;
  font-size: 18px;
`;
