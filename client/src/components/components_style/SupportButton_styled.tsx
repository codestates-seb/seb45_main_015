import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background-color: transparent;
  width: 80px;
  height: 170px;
  z-index: 1000;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: solid 1px #808080;
  border-radius: 45px;
  overflow: hidden;
`;

export const ButtonTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  color: #2a2a2a;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  color: #808080;
`;

export const Text = styled.p`
  margin: 0;
  color: #808080;

  &.top-button {
    margin-bottom: 8px;
  }
`;
