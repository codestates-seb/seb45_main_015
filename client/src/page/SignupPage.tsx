import React from "react";
import SignupForm from "../components/SignupForm";
import {
  SignupPageContainer,
  SignupPageImage,
} from "./page_style/SignupPage_style";

const SignupPage: React.FC = () => {
  return (
    <SignupPageContainer>
      <SignupPageImage
        src="https://i.pinimg.com/564x/dd/29/62/dd2962dcc7da60635745235f7377d5f1.jpg"
        alt="img"
      />
      <SignupForm />
    </SignupPageContainer>
  );
};
export default SignupPage;
