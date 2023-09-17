import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000025;
  z-index: 1001;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  min-width: 420px;
  min-height: 500px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 90%;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  margin-top: 24px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
`;

export const Text = styled.p`
  text-align: end;
  margin: 0;
  font-size: 20px;

  &.fixed-text {
    text-align: start;
    color: #808080;
    white-space: nowrap;
    margin-right: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;

  &:first-of-type {
    margin-right: 20px;
  }
`;
