import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const LoginPageContainer = styled.main`
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
  .google-login-btn {
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
`;

export const LoginPageImage = styled.div`
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

export const LoginFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;

  & > .guest-login-btn {
    width: 90px;
    height: 40px;
    background-color: #1ec800;
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid #1ec800;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;

    &:hover {
      background-color: #ffffff;
      color: #1ec800;
      border: 2px solid #1ec800;
    }
  }
`;
export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LoginFormItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 20px;

  & > h2 {
    font-size: 36px;
  }
  & > .find {
    color: #718096;
    position: absolute;
    right: 0;
    bottom: 205px;
  }

  & > .find > a {
    font-size: 13px;
    text-decoration: none;
    color: #777e90;
  }

  & > .sns {
    font-size: 12px;
    text-align: center;
    padding: 0 24px;
    margin-top: 30px;
  }
  & > .button-container {
    margin-top: 30px;
    height: 116px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  & > .button-container > .signup-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #ffffff;
    border: none;
    border-radius: 90px;
    background-color: ${globalTokens.Button.default.value};
    font-size: 21px;
    font-weight: bold;
    text-decoration: none;
  }

  & > .button-container > .signup-btn:hover {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    color: ${globalTokens.Button.default.value};
    border: 2px solid ${globalTokens.Button.default.value};
    color: ${globalTokens.Button.default.value};
    cursor: pointer;
  }
`;
