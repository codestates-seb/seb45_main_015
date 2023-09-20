import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import GoogleLoginBtn from "../components/GoogleLogin";
import { useSignup } from "../API/FetchAPI";
import useInputValidate from "../hooks/InputValidata";
import InputComponent from "../components/InputComponent";
import {
  SignupPageContainer,
  SignupPageImage,
  SignupFormContainer,
  SignupFormDiv,
  SignupFormItem,
} from "./page_style/SignupPage_styled";
import { LargeButtonB } from "../components/ButtonComponent";
import Loading from "../loading/Loading";

const SignupPage: React.FC = () => {
  const navigator = useNavigate();
  // 데이터 유효성 검사 훅
  const {
    nickNameMessage,
    emailMessage,
    passwordMessage,
    userInfo,
    setUserInfo,
    inputHandler,
  } = useInputValidate({ nickname: "", email: "", password: "" });

  const { data, status, mutate, isLoading, isError } = useSignup(userInfo);

  const handleSumbitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputHandler(userInfo).signupPage) {
      mutate();
    }
  };

  return (
    <SignupPageContainer>
      <SignupPageImage />
      {isLoading ? (
        <Loading />
      ) : (
        <SignupFormDiv>
          <SignupFormContainer onSubmit={handleSumbitSignup}>
            <SignupFormItem>
              <h2>회원가입</h2>
              <InputComponent
                type="text"
                name="nickname"
                labelText="사용자 이름"
                placeholder="사용하실 이름을 입력해주세요"
                stateValue={userInfo}
                setStateValue={setUserInfo}
                errorMessage={nickNameMessage}
              />
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
              <span className="password-convention">
                특수문자, 소문자, 숫자를 조합하여 8자리 이상 16자리 이하로
                입력해주세요.
              </span>
              <div className="button-container">
                <LargeButtonB value="회원가입" />
              </div>
              <span className="sns">SNS 계정으로 로그인하기</span>
            </SignupFormItem>
          </SignupFormContainer>
          <div className="google-login-btn">
            <GoogleLoginBtn />
          </div>
          <span className="already-have-account">
            이미 계정이 있으신가요?<Link to="/login">로그인</Link>
          </span>
        </SignupFormDiv>
      )}
    </SignupPageContainer>
  );
};
export default SignupPage;
