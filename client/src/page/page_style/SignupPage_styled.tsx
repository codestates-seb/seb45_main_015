import styled from "styled-components";
<<<<<<< HEAD
import globalTokens from "../../design_tokens/global.json";

export const SignupPageContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

export const SignupPageImage = styled.div`
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

export const SignupFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > .already-have-account {
    font-size: 13px;
    margin-top: 30px;
  }

  & > .already-have-account > a {
    margin-left: 5px;
    font-size: 15px;
    text-decoration: none;
    color: ${globalTokens.Button.default.value};
  }
`;

export const SignupFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SignupFormItem = styled.div`
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
    bottom: 135px;
  }
  @media (max-width: 1240px) and (min-width: 1025px) {
    .password-convention {
      bottom: 120px;
    }
  }
  @media (max-width: 500px) {
    .password-convention {
      bottom: 117px;
    }
  }

  & > .sns {
    font-size: 12px;
    text-align: center;
    padding: 0 24px;
    margin-top: 30px;
  }

  & > .signup-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    color: #ffffff;
    border: none;
    border-radius: 90px;
    background-color: ${globalTokens.Button.default.value};
    font-size: 17px;
    font-weight: bold;
    margin-top: 20px;

    text-decoration: none;
  }
  & > .signup-btn:hover {
    width: 100%;
    height: 48px;
    background-color: #ffffff;
    color: ${globalTokens.Button.default.value};
    border: 2px solid ${globalTokens.Button.default.value};
    cursor: pointer;
  }
=======

export const SignupPageContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  gap: 8.4rem;
`;

export const SignupPageImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
>>>>>>> 1e875df (나의거래 사이드바 수정완료)
`;
