import { styled } from "styled-components";
import globalTokens from "../../design_tokens/global.json";

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

  &.mypage-button-section {
    display: flex;
    justify-content: center;
    width: 100%;

    & > button {
      padding: 10px 0;
      width: 420px;
    }

    & > .change-mydata {
      /* width: 100%; */
      height: 100%;
      background-color: ${globalTokens.Button.default.value};
      color: #ffffff;
      font-size: 21px;
      cursor: pointer;
      border-radius: 90px;
      border: 2px solid ${globalTokens.Button.default.value};

      &:hover {
        background-color: #ffffff;
        color: ${globalTokens.Button.default.value};
        border: 2px solid ${globalTokens.Button.default.value};
      }

      @media (max-width: 768px) {
      }
    }
  }
`;

export const SubTitle = styled.h2`
  margin: 0;
  white-space: nowrap;
  font-size: 28px;
  margin-bottom: 24px;
`;
