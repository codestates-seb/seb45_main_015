import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
`;

export const RegistrateContent = styled.div`
  max-width: 800px;
  width: 100%;
  color: #2a2a2a;
`;

export const Title = styled.h1`
  margin: 0;
  white-space: nowrap;
  font-size: 48px;
  margin-bottom: 52px;
`;

export const RegistrateWrapper = styled.div`
  margin-bottom: 46px;
  width: 100%;

  &.registrate-wrapper-unit {
    width: calc((100% - 36px) / 2);
  }
`;

export const SubTitle = styled.h2`
  margin: 0;
  white-space: nowrap;
  font-size: 24px;
  margin-bottom: 18px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  width: 100%;
  background-color: #edf2f7;
  border-radius: 6px;
  margin-bottom: 8px;

  &.budding-unit-field {
    width: calc((100% - 36px) / 2);
  }
`;

export const TextInput = styled.input`
  outline: none;
  font-size: 16px;
  width: 100%;
  padding: 0;
  background-color: transparent;
  border-style: none;
  margin: 0 15px;
`;

export const Text = styled.p`
  margin: 0;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 100;
  color: #808080;

  &.registrate-input-text {
    font-size: 16px;
    margin-right: 15px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > div:first-child {
    margin-right: 36px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  cursor: pointer;
  border: solid 1px #b1b5c3;
  border-radius: 6px;
  background-color: #fff;
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  color: #2a2a2a;
  height: 40px;
  padding: 0 20px;

  &:hover {
    background-color: #0064ff;
    color: #fff;
    border-color: #0064ff;
  }

  &.registrate-fixed-button {
    margin-right: 8px;
    margin-bottom: 8px;
    min-width: 90px;
  }

  &.registrate-category-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  &.registrate-category-tag-select {
    margin-left: 5px;
    margin-bottom: 5px;
    background-color: #0064ff;
    color: #fff;
    border-color: #0064ff;

    &:hover {
      background-color: #fff;
      color: #2a2a2a;
      border-color: #b1b5c3;
    }
  }
`;

export const ImgContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: calc(100% + 21px);
`;

export const ImgWrapper = styled.div`
  width: 194px;
  height: 194px;
  border-radius: 16px;
  background-color: #777e90;
  margin-bottom: 8px;
  margin-right: 8px;
  overflow: hidden;
`;

export const Img = styled.img`
  display: flex;
  width: 194px;
  height: 194px;
`;

export const SeletedCategoryTagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border: solid 1px #b1b5c3;
  border-radius: 6px;
  padding-top: 5px;
  padding-right: 5px;
  margin-bottom: 8px;
`;

export const CategoryTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: auto;
  margin-top: 24px;
`;
