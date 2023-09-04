import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LoginFormDiv,
  LoginFormItem,
  LoginFormContainer,
  LoginFormInput,
} from "./components_style/LoginForm_style";
import GoogleLogin from "react-google-login-ng";

interface Login {
  nickname: string;
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loginData, setloginData] = useState<Login>();
  return (
    <LoginFormDiv>
      <LoginFormContainer>
        <LoginFormItem>
          <h2>로그인</h2>
          <label>이메일</label>
          <LoginFormInput
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={loginData?.email}
          />
          <label>비밀번호</label>
          <LoginFormInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={""}
          />
          <span className="find">
            <Link to="/find-password">비밀번호를 잊으셨나요?</Link>
          </span>

          <Link className="login-btn" to="/main">
            로그인
          </Link>

          <Link className="signup-btn" to="/signup">
            회원가입
          </Link>

          <span className="sns">SNS 계정으로 로그인하기</span>
        </LoginFormItem>
        {/* <GoogleLogin
          client_id="your_client_id_here"
          successCallback={({ credential, select_by }) => {
            console.log(credential, select_by);
          }}
          config={{ width: 424, logo_alignment: "center" }}/> */}
      </LoginFormContainer>
    </LoginFormDiv>
  );
};
export default LoginForm;
