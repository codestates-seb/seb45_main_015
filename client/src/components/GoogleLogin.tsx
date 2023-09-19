import React from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleLoginBtn = () => {
  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      axios
        .post("http://15.164.84.204:8080/oauth2/authorization/google", { code })
        .then(({ data }) => {
          console.log(data);
        });
    },
    onError: errorResponse => {
      console.error(errorResponse);
    },
    flow: "auth-code",
  });

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${
      process.env.REACT_APP_GOOGLE_CLIENT_ID
    }&redirect_uri=${"http://localhost:3000/allList"}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

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
