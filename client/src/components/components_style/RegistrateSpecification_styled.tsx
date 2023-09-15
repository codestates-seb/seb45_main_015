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
  z-index: 10003;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  min-width: 420px;
  min-height: 600px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h2`
  margin: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;

  & > button:first-of-type {
    margin-right: 20px;
  }
`;
