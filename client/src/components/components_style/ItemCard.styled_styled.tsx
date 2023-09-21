import styled from "styled-components";

interface ContainerProps {
  isCheck?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 240px;
  border-radius: 20px 20px;
  height: 383px;
  border: solid 1px #b1b5c3;
  margin-bottom: 28px;
  overflow: hidden;
  color: black;
  @media (max-width: 1280px) {
    & {
      width: 167px;
      height: 242px;
      margin-bottom: 18px;
    }
  }
`;
export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fcfcfd;
  width: 100%;
  height: 188px;
  background-color: #b1b5c3;
  border-radius: 20px 20px 0 0;
  overflow: hidden;

  @media (max-width: 1280px) {
    & {
      height: 114px;
      border-radius: 12px 12px 0 0;
    }
  }
  & img {
    width: 100%;
    height: 100%;
  }
`;

export const Icon = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 1;
  margin: 0 0 128px 186px;
  padding: 0;
  font-size: 36px;
  height: 36px;
  width: 36px;
  color: #d7d7d8;
  background-color: transparent;
  border-style: none;

  &.favorite-on {
    color: #d32f2f;
  }
  &.favorite-off {
    color: #d7d7d8;
  }
  & .check {
    color: green;
  }
  @media (max-width: 1280px) {
    & {
      height: 30px;
      font-size: 28px;
      margin: 0 0 64px 108px;
    }
  }
`;

export const InfoContainer = styled.div`
  height: 195px;
  color: black;
  width: 100%;
  border-top: solid 1px #b1b5c3;
  border-radius: 0 0 20px 20px;

  @media (max-width: 1209px) {
    & {
      height: 128px;
      font-size: 56px;
      border-radius: 0 0 12px 12px;
    }
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 11px 11px 20px 11px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  @media (max-width: 1280px) {
    & {
      margin-top: 5px;
    }

    &.itemCard-product-seller {
      display: none;
    }
  }
`;

export const Text = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 18px;

  &.itemCard-product-name {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  &.itemCard-product-key {
    font-size: 14px;
    color: #808080;
  }

  &.itemCard-product-value {
    font-size: 14px;
  }
  &.card-date {
    font-size: 13px;
    margin-top: -2px;
  }
  @media (max-width: 1280px) {
    & {
      font-size: 14px;
    }

    &.itemCard-product-key {
      font-size: 11px;
    }

    &.itemCard-product-value {
      font-size: 11px;
    }
    &.card-date {
      font-size: 10px;
    }
  }
`;
