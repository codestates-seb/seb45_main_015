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
`;

export const ItemDetailContent = styled.div`
  display: flex;

  &.center {
    justify-content: center;
  }

  &.space-between {
    justify-content: space-between;
  }
`;

export const Text = styled.p`
  margin: 0;

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
    white-space: nowrap;
  }

  &.detail-info-bidding {
    color: #d32f2f;
  }

  &.detail-info-init {
    font-size: 24px;
    font-weight: bold;
    white-space: nowrap;
  }

  &.detail-info {
    font-size: 24px;
    white-space: nowrap;
  }
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 520px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.detail-info-content {
    height: 100%;
  }

  &.detail-button-content {
    height: 420px;
  }
`;

export const ImgWrapper = styled.div`
  background-color: #b1b5c3;
  border-radius: 20px;
  overflow: hidden;

  &.detail-main-img {
    width: 100%;
    height: 520px;
  }

  &.detail-sub-img {
    width: 75px;
    height: 75px;
  }
`;

export const ImgListContent = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

export const ImgList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 5px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Icon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 60px;
  color: #a6a6a6;
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
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 100%;
  color: #0064ff;
  background-color: #fff;
  border: solid 1px #0064ff;
  border-radius: 10px;
`;
