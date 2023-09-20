import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
  margin-bottom: 200px;
`;

export const RegistrateContent = styled.div`
  max-width: 800px;
  width: 100%;
  color: #2a2a2a;
`;

export const Title = styled.h1`
  margin: 0;
  white-space: nowrap;
  font-size: 38px;
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

  &.text-area {
    height: 130px;
    padding: 10px 0;
  }

  &:focus-within {
    background: #ffffff;
    outline: 2px solid #0064ff;
  }

  @media (max-width: 768px) {
    &.budding-unit-field {
      width: 100%;
    }
  }
`;

export const TextInput = styled.input`
  outline: none;
  font-size: 16px;
  width: 100%;
  padding: 0;
  background-color: transparent;
  border-style: none;
  margin: 0 10px;

  &.registrate-price {
    text-align: right;
    margin: 0 1px;
  }
`;

export const TextArea = styled.textarea`
  outline: none;
  resize: none;
  font-size: 16px;
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: transparent;
  border-style: none;
  margin-left: 10px;

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

  @media (max-width: 768px) {
    & {
      flex-direction: column;
    }

    & > div:first-child {
      margin-right: 0;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  &.registrate-button-wrapper {
    justify-content: center;
    height: 48px;

    & button {
      width: 420px;
    }
  }
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

  &:hover,
  &.selected {
    background-color: #0064ff;
    color: #fff;
    border-color: #0064ff;
  }

  &.selected {
    cursor: default;
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
    cursor: default;
    margin-left: 5px;
    margin-bottom: 5px;
    background-color: #0064ff;
    color: #fff;
    border-color: #0064ff;
  }
`;

export const ImgContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: calc(100% + 21px);
`;

export const ImgWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 194px;
  height: 194px;
  border-radius: 16px;
  background-color: #777e90;
  margin-bottom: 8px;
  margin-right: 8px;
  overflow: hidden;
  border: solid 1px #b1b5c3;

  &.registrate-image {
    background-color: #fff;
  }
`;

export const ImgLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  font-size: 64px;
  color: #fff;
`;

export const ImgInput = styled.input`
  display: none;
`;

export const Img = styled.img`
  display: flex;
  max-width: 194px;
  max-height: 194px;
`;

export const SeletedCategoryTagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border: solid 1px #b1b5c3;
  border-radius: 6px;
  min-height: 52px;
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
