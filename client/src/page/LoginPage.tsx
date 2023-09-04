import React from "react";
import LoginForm from "../components/LoginForm";
import {
  LoginPageContainer,
  LoginPageImage,
} from "./page_style/LoginPage_styled";

const LoginPage: React.FC = () => {
  return (
    <LoginPageContainer>
      <LoginPageImage
        src="https://i.pinimg.com/564x/dd/29/62/dd2962dcc7da60635745235f7377d5f1.jpg"
        alt="img"
      />
      <LoginForm />
    </LoginPageContainer>
  );
};
export default LoginPage;
