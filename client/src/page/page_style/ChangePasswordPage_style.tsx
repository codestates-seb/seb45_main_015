import { styled } from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const ChangePasswordPageContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  gap: 84px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 0 160px;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const ChangePasswordPageImage = styled.div`
  background-image: url("https://i.pinimg.com/564x/dd/29/62/dd2962dcc7da60635745235f7377d5f1.jpg");
  width: 100%;
  height: 100%;
  background-size: 100%; //좌우넓이는 100%로 높이는 이미지의 원래 높이를 주자
  animation: displace 10s linear infinite;

  @keyframes displace {
    from {
      background-position: center 0;
    }
    to {
      background-position: center 1100px;
    }
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const ChangePasswordFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ChangePasswordFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  gap: 20px;
`;

export const ChangePasswordFormItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 20px;

  & > h2 {
    font-size: 36px;
  }
  & > .password-convention {
    font-size: 13px;
    color: #718096;
    position: absolute;
    left: 0;
    bottom: 75px;
  }
  @media (max-width: 1250px) and (min-width: 1240px) {
    .password-convention {
      bottom: 60px;
    }
  }
  @media (max-width: 1240px) and (min-width: 1025px) {
    .password-convention {
      bottom: 60px;
    }
  }

  @media (max-width: 500px) {
    .password-convention {
      bottom: 60px;
    }
  }

  & > .button-container {
    margin-top: 30px;
    height: 48px;
    width: 100%;
  }
`;
