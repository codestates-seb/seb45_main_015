import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import GoogleLoginBtn from "../components/GoogleLogin";
import { useSignup } from "../API/FetchAPI";
import useInputValidate from "../hooks/InputValidata";
import InputComponent from "../components/InputComponent";
import VerifyTimer from "../components/VerifyTimer";
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
  // 데이터 유효성 검사 훅
  const {
    nickNameMessage,
    emailMessage,
    passwordMessage,
    userInfo,
    setUserInfo,
    inputHandler,
  } = useInputValidate({ nickname: "", email: "", password: "" });
  const { data, mutate, isLoading } = useSignup(userInfo);
  const navigator = useNavigate();
  // 인증요청 클릭시 상태변경
  const [verifiedRequest, setVerifiedRequest] = useState(false);
  // 인증하기 클릭시 상태변경
  const [isVerified, setIsVerified] = useState(false);

  // 메일로 코드 보내기
  const handleVerifyEmail = async (email: string) => {
    try {
      await axios
        .get(`http://15.164.84.204:8080/email/${email}/send-code`)
        .then(res =>
          res.status === 200
            ? setVerifiedRequest(true)
            : setVerifiedRequest(false),
        );
    } catch (error) {
      console.log(error);
    }
  };

  // 인증 코드 서버로 요청
  const handleVerifyCode = async (email: string) => {
    const code = userInfo.verify;
    console.log(code);

    try {
      await axios
        .post(`http://15.164.84.204:8080/email/${email}/code?code=${code}`)
        .then(res => {
          if (res.status === 200) {
            setIsVerified(true);
            setVerifiedRequest(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

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
              <div className="verify-container">
                <div className="verify-item">
                  <InputComponent
                    type="email"
                    name="email"
                    labelText="이메일"
                    placeholder="이메일을 입력해주세요"
                    stateValue={userInfo}
                    setStateValue={setUserInfo}
                    errorMessage={emailMessage}
                  />
                  {verifiedRequest ? (
                    <VerifyTimer
                      verifyStatus={{ verifiedRequest, setVerifiedRequest }}
                    />
                  ) : (
                    <button
                      className="verify-btn"
                      type="button"
                      disabled={isVerified ? true : false}
                      onClick={() =>
                        handleVerifyEmail(userInfo.email as string)
                      }
                    >
                      {isVerified ? "인증성공" : "인증요청"}
                    </button>
                  )}
                </div>
                {isVerified ? (
                  ""
                ) : (
                  <div className="verify-item">
                    <InputComponent
                      type="text"
                      name="verify"
                      labelText="인증번호"
                      placeholder="인증번호를 입력해주세요"
                      stateValue={userInfo}
                      setStateValue={setUserInfo}
                    />
                    {verifiedRequest ? (
                      <button
                        className="verify-btn"
                        type="button"
                        onClick={() =>
                          handleVerifyCode(userInfo.email as string)
                        }
                      >
                        인증하기
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
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
