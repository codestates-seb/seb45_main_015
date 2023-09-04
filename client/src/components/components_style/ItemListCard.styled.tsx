import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 832px;
  height: 140px;
  border: solid 1px #d9dadb;
  border-radius: 16px;

  @media (max-width: 768px) {
    & {
      height: 120px;
      max-width: 549px;
    }
  }
`;

export const ItemContent = styled.div`
  display: flex;
  margin: 10px;
  width: 100%;
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b1b5c3;
  border-radius: 8px;
  color: #fcfcfd;
  font-size: 48px;
  min-width: 120px;
  height: 120px;
  margin-right: 10px;

  @media (max-width: 768px) {
    & {
      min-width: 100px;
      height: 100px;
      font-size: 36px;
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 70%;
  &:not(:last-of-type) {
    margin-right: 20px;
    width: 100%;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  width: 100%;

  &.product-price-wrapper {
    justify-content: space-between;
    width: 100%;
  }
`;

export const ProductName = styled.h2`
  margin: 0;
  font-size: 26px;
  white-space: nowrap;

  @media (max-width: 768px) {
    & {
      font-size: 20px;
    }
  }
`;

export const Text = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;

  &.itemListCard-product-key {
    color: #808080;
    margin-right: 10px;
  }

  &.itemListCard-product-value {
  }

  @media (max-width: 768px) {
    & {
      font-size: 14px;
    }
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border: solid 2px #0064ff;
  border-radius: 45px;
  background-color: #fff;
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  color: #0064ff;
  padding: 4px 30px;

  &:hover {
    border: solid 2px #fff;
    background-color: #0064ff;
    color: #fff;
  }

  @media (max-width: 768px) {
    & {
      font-size: 14px;
      padding: 2px 20px;
    }
  }
`;
