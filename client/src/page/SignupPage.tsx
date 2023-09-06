import React from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../API/FetchAPI";
import InputComponent from "../components/InputComponent";
import {
  SignupPageContainer,
  SignupPageImage,
  SignupFormContainer,
  SignupFormDiv,
  SignupFormItem,
} from "./page_style/SignupPage_styled";
import GoogleLogin from "react-google-login-ng";

const SignupPage: React.FC = () => {
  return (
    <SignupPageContainer>
      <SignupPageImage />
      <SignupFormDiv>
        <SignupFormContainer>
          <SignupFormItem>
            <h2>회원가입</h2>
            <InputComponent
              labelText="사용자 이름"
              type="text"
              name="username"
              placeholder="사용하실 이름을 입력해주세요"
            />
            <InputComponent
              labelText="이메일"
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
            />
            <InputComponent
              labelText="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <span className="password-convention">
              특수문자, 소문자, 숫자를 조합하여 8자리 이상 16자리 이하로
              입력해주세요.
            </span>
            <button
              className="signup-btn"
              onClick={e => {
                e.preventDefault();
                useSignup("1", "1", "1");
              }}
            >
              회원가입
            </button>
            <span className="sns">SNS 계정으로 로그인하기</span>
          </SignupFormItem>
          <div className="google-login-btn">
            <GoogleLogin
              client_id="your_client_id_here"
              successCallback={({ credential, select_by }) => {
                console.log(credential, select_by);
              }}
              config={{ width: 624, logo_alignment: "center" }}
            />
          </div>
        </SignupFormContainer>
        <span className="already-have-account">
          이미 계정이 있으신가요?<Link to="/login">로그인</Link>
        </span>
      </SignupFormDiv>
    </SignupPageContainer>
  );
};
export default SignupPage;
