import React, { FormEvent, useState } from "react";
import InputComponent from "../components/InputComponent";
import { LoginData } from "../type/type";
import { useLogin } from "../API/FetchAPI";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginPageContainer,
  LoginPageImage,
  LoginFormDiv,
  LoginFormItem,
  LoginFormContainer,
} from "./page_style/LoginPage_styled";
import { LargeButtonB } from "../components/ButtonComponent";
import GoogleLogin from "react-google-login-ng";

const LoginPage: React.FC = () => {
  const navigator = useNavigate();
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [checkMessage, setCheckMessage] = useState("");

  //데이터 유효성 검사
  const [isCheck, setIsCheck] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [userInfo, setUserInfo] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useLogin(userInfo);
  };
  return (
    <LoginPageContainer>
      <LoginPageImage />
      <LoginFormDiv>
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
