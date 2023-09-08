import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
`;

export const ItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1120px;
  width: 100%;

  @media (max-width: 1024px) {
    & {
      max-width: 420px;
    }
  }
`;

export const ItemDetailContent = styled.div`
  display: flex;

  &.center {
    justify-content: center;
  }

  &.space-between {
    justify-content: space-between;
  }

  &.column {
    flex-direction: column;
  }

  @media (max-width: 1024px) {
    &.space-between {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  line-height: 1.2;

  &.detail-timer {
    font-size: 40px;
    white-space: nowrap;
    margin-bottom: 40px;
  }

  &.detail-path {
    font-size: 16px;
    margin-bottom: 18px;
  }

  &.detail-title {
    font-size: 35px;
    font-weight: bold;
    min-width: 260px;
  }

  &.detail-info-bidding {
    color: #d32f2f;
  }

  &.detail-info-init {
    color: #808080;
    font-size: 24px;
    font-weight: bold;
    white-space: nowrap;
    margin: 16px 0;
    margin-right: 15px;
  }

  &.detail-info {
    font-size: 24px;
  }

  &.detail-description {
    max-width: 100%;
    white-space: pre-wrap; /* 텍스트를 줄 바꿈하도록 설정 */
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;

  &:first-of-type {
    margin-right: 18px;
    width: 520px;
  }

  @media (max-width: 1024px) {
    &:first-of-type {
      margin-right: 0px;
      margin-bottom: 48px;
      width: 420px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.detail-info-content {
    height: 100%;
    margin-bottom: 18px;
  }

  &.detail-button-content {
    height: auto;

    & button {
      height: 48px;
      border-radius: 16px;
    }

    & > button {
      margin-top: 18px;
    }

    & > div > button:first-of-type {
      margin-right: 18px;
    }
  }
`;

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #b1b5c3;
  border-radius: 20px;
  overflow: hidden;
  transition: 0.5s ease-out;

  &.detail-main-img {
    width: 100%;
    height: 520px;
  }

  &.detail-sub-img {
    width: 75px;
    height: 75px;
  }

  &.detail-sub-img:hover {
    transform: scale(1.2);
    transition: 0.5s ease-out;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }

  @media (max-width: 1024px) {
    &.detail-main-img {
      width: 100%;
      height: 420px;
    }

    &.detail-sub-img {
      width: 60px;
      height: 60px;
    }
  }
`;

export const ImgListContent = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

export const ImgList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 5px;
`;

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const Icon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 60px;
  color: #a6a6a6;

  @media (max-width: 1024px) {
    & {
      font-size: 50px;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;

  &.column {
    flex-direction: column;
  }

  &.space-between {
    justify-content: space-between;
  }

  &.detail-moreinfo-wrapper {
    margin-top: 32px;
  }
`;
