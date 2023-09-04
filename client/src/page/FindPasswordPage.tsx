import React from "react";
import FindPassword from "../components/FindPassword";
import {
  FindPasswordPageContainer,
  FindPasswordPageImage,
} from "./page_style/FindPasswordPage_style";

const FindPasswordPage: React.FC = () => {
  return (
    <FindPasswordPageContainer>
      <FindPasswordPageImage
        src="https://i.pinimg.com/564x/dd/29/62/dd2962dcc7da60635745235f7377d5f1.jpg"
        alt="img"
      />
      <FindPassword />
    </FindPasswordPageContainer>
  );
};

export default FindPasswordPage;
