import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleLoginBtn = () => {
  const [googleCode, setGoogleCode] = useState("");

  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      setGoogleCode(code); // OAuth 코드를 메모리에 저장
    },
    onError: errorResponse => {
      console.error(errorResponse);
    },
    flow: "auth-code",
  });

  const handleGoogleLogin = async () => {
    await googleSocialLogin();
  };

  useEffect(() => {
    if (googleCode) {
      // 서버로 OAuth 코드 전송
      axios
        .post(`http://15.164.84.204:8080/oauth2/authorization/google`, {
          googleCode,
        })
        .then(response => {
          // 성공 처리
        })
        .catch(error => {
          // 오류 처리
        });
    }
  }, [googleCode]);

  return <GoogleButton onClick={handleGoogleLogin}>Google 로그인</GoogleButton>;
};

export default GoogleLoginBtn;

const GoogleButton = styled.button`
  width: 100%;
  height: 50px;
  font-size: 20px;
  color: darkslategray;
  background-color: #f5f3f3;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
    background-color: #ecebeb;
  }
`;
