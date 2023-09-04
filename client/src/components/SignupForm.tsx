import React from "react";
import { Link } from "react-router-dom";
import {
  SignupFormDiv,
  SignupFormItem,
  SignupFormContainer,
  SignupFormInput,
} from "./component_style/SignupForm_style";
import GoogleLogin from "react-google-login-ng";

const SignupForm: React.FC = () => {
  return (
    <SignupFormDiv>
      <SignupFormContainer>
        <SignupFormItem>
          <h2>회원가입</h2>
          <label>사용자이름</label>
          <SignupFormInput
            type="text"
            name="username"
            placeholder="사용하실 이름을 입력해주세요"
          />
          <label>이메일</label>
          <SignupFormInput
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
          />
          <label>비밀번호</label>
          <SignupFormInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <span className="password-convention">
            특수문자, 소문자, 숫자를 조합하여 8자리 이상 16자리 이하로
            입력해주세요.
          </span>
          <Link className="signup-btn" to="/login">
            회원가입
          </Link>

          <span className="sns">SNS 계정으로 로그인하기</span>
        </SignupFormItem>
        {/* <GoogleLogin
          client_id="your_client_id_here"
          successCallback={({ credential, select_by }) => {
            console.log(credential, select_by);
          }}
          config={{ width: 424, logo_alignment: "center" }}
        /> */}
      </SignupFormContainer>
      <span className="already-have-account">
        이미 계정이 있으신가요?<Link to="/login">로그인</Link>
      </span>
    </SignupFormDiv>
  );
};
export default SignupForm;
