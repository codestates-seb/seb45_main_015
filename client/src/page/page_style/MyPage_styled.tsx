import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
`;

export const MyPageContainer = styled.div`
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

export const Section = styled.div`
  margin-bottom: 64px;

  & > div {
    margin-bottom: 24px;
  }

  & > div > input {
    padding: 0 15px;
  }
`;

export const SubTitle = styled.h2`
  margin: 0;
  white-space: nowrap;
  font-size: 28px;
  margin-bottom: 24px;
`;
