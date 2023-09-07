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
      bottom: 55px;
    }
  }
  @media (max-width: 1240px) and (min-width: 1025px) {
    .password-convention {
      bottom: 57px;
    }
  }

  @media (max-width: 500px) {
    .password-convention {
      bottom: 57px;
    }
  }

  & > .change-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    color: #ffffff;
    border: none;
    border-radius: 90px;
    background-color: ${globalTokens.Button.default.value};
    font-size: 17pxrem;
    font-weight: bold;
    margin-top: 30px;
    text-decoration: none;
  }

  & > .change-btn:hover {
    width: 100%;
    height: 48px;
    background-color: #ffffff;
    color: ${globalTokens.Button.default.value};
    border: 2px solid ${globalTokens.Button.default.value};
    cursor: pointer;
  }
`;
