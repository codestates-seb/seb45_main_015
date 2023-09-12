import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../API/FetchAPI";
import { SignupData } from "../type/type";
import InputComponent from "../components/InputComponent";
import {
  SignupPageContainer,
  SignupPageImage,
  SignupFormContainer,
  SignupFormDiv,
  SignupFormItem,
} from "./page_style/SignupPage_styled";
import { LargeButtonB } from "../components/ButtonComponent";
import GoogleLogin from "react-google-login-ng";

const SignupPage: React.FC = () => {
  // 입력된 사용자 데이터
  const [userInfo, setUserInfo] = useState<SignupData>({
    email: "",
    password: "",
    nickname: "",
  });

  // 에러메세지
  const [nameMessage, setnameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  // const [checkMessage, setCheckMessage] = useState("");

  //데이터 유효성 검사
  const [isNickName, setIsNickName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  // const [isCheck, setIsCheck] = useState(false);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // const InputValueHandler = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   key: string,
  // ) => {

  //   if (key === "name" && e.target.value.length < 1) {
  //     setnameMessage("이름을 입력해주세요.");
  //   } else if (e.target.value.length === 0) {
  //     setnameMessage("");
  //   }
  //   if (e.target.value.length > 0) {
  //     setnameMessage("");
  //     setIsNickName(true);
  //   }

  //   if (key === "email" && e.target.value.length > 0) {
  //     setEmailMessage("올바른 이메일 형식이 아닙니다.");
  //     setIsEmail(false);
  //   } else if (e.target.value.length === 0) {
  //     setEmailMessage("");
  //   }
  //   if (emailRegex.test(e.target.value)) {
  //     setEmailMessage("");
  //     setIsEmail(true);
  //   }

  //   if (
  //     key === "password" &&
  //     e.target.value.length < 8 &&
  //     e.target.value.length > 0
  //   ) {
  //     setPasswordMessage("비밀번호는 8자리 이상 입력해주세요.");
  //     setIsPassword(false);
  //   } else if (e.target.value.length === 0) {
  //     setPasswordMessage("");
  //   }
  //   if (key === "password" && e.target.value.length >= 8) {
  //     setPasswordMessage("");
  //     setIsPassword(true);
  //   }

  //   // if (key === "check" && e.target.value !== userInfo.password) {
  //   //   setCheckMessage("비밀번호가 일치하지 않습니다.");
  //   //   setIsCheck(false);
  //   // } else if (e.target.value.length === 0) {
  //   //   setCheckMessage("");
  //   // }
  //   // if (key === "check" && e.target.value === userInfo.password) {
  //   //   setCheckMessage("");
  //   //   setIsCheck(true);
  //   // }
  // };

  const handleSumbitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useSignup(userInfo);
  };

  return (
    <SignupPageContainer>
      <SignupPageImage />
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
              errorMessage={nameMessage}
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
