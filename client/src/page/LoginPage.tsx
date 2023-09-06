import React from "react";
import InputComponent from "../components/InputComponent";
import { useLogin } from "../API/FetchAPI";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginPageContainer,
  LoginPageImage,
  LoginFormDiv,
  LoginFormItem,
  LoginFormContainer,
} from "./page_style/LoginPage_styled";
import GoogleLogin from "react-google-login-ng";

const LoginPage: React.FC = () => {
  const navigator = useNavigate();

  return (
    <LoginPageContainer>
      <LoginPageImage />
      <LoginFormDiv>
        <LoginFormContainer>
          <LoginFormItem>
            <h2>로그인</h2>
            <InputComponent
              labelText="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
            />
            <InputComponent
              labelText="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />

            <span className="find">
              <Link to="/find-password">비밀번호를 잊으셨나요?</Link>
            </span>
            <button
              className="login-btn"
              onClick={e => {
                e.preventDefault();
                useLogin("1", "2");
              }}
            >
              로그인
            </button>
            <button className="signup-btn" onClick={() => navigator("/signup")}>
              회원가입
            </button>
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
