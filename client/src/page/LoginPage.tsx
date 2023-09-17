import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login-ng";

import useInputValidate from "../hooks/InputValidata";
import InputComponent from "../components/InputComponent";

import { useLogin, useGuestLogin } from "../API/FetchAPI";
import {
  LoginPageContainer,
  LoginPageImage,
  LoginFormDiv,
  LoginFormItem,
  LoginFormContainer,
} from "./page_style/LoginPage_styled";
import { LargeButtonB } from "../components/ButtonComponent";

const LoginPage: React.FC = () => {
  const navigator = useNavigate();
  // 데이터 유효성 검사 훅
  const { emailMessage, passwordMessage, userInfo, setUserInfo, inputHandler } =
    useInputValidate({ email: "", password: "" });

  const mutation = useLogin(userInfo);

  const guestLoginMutation = useGuestLogin();

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputHandler(userInfo).loginPage) {
      mutation.mutate();
    }
  };
  return (
    <LoginPageContainer>
      <LoginPageImage />
      <LoginFormDiv>
        <button
          className="guest-login-btn"
          onClick={() => guestLoginMutation.mutate()}
        >
          게스트
        </button>
        <LoginFormContainer onSubmit={handleLoginSubmit}>
          <LoginFormItem>
            <h2>로그인</h2>
            <InputComponent
              type="email"
              name="email"
              labelText="이메일"
              placeholder="이메일을 입력해주세요"
              stateValue={userInfo}
              setStateValue={setUserInfo}
              errorMessage={emailMessage}
            />
            <InputComponent
              type="password"
              name="password"
              labelText="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              stateValue={userInfo}
              setStateValue={setUserInfo}
              errorMessage={passwordMessage}
            />
            <span className="find">
              <Link to="/find-password">비밀번호를 잊으셨나요?</Link>
            </span>
            <div className="button-container">
              <LargeButtonB value="로그인" />
              <button
                className="signup-btn"
                onClick={() => navigator("/signup")}
              >
                회원가입
              </button>
            </div>
            <span className="sns">SNS 계정으로 로그인하기</span>
          </LoginFormItem>
          <div className="google-login-btn">
            <GoogleLogin
              client_id="your_client_id_here"
              successCallback={({ credential, select_by }) => {
                console.log(credential, select_by);
              }}
              config={{ width: 624, logo_alignment: "center" }}
            />
          </div>
        </LoginFormContainer>
      </LoginFormDiv>
    </LoginPageContainer>
  );
};
export default LoginPage;
