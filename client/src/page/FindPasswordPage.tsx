import React from "react";
import { Link } from "react-router-dom";
import {
  FindPasswordPageContainer,
  FindPasswordPageImage,
  FindPasswordFormDiv,
  FindPasswordFormItem,
  FindPasswordFormContainer,
} from "./page_style/FindPasswordPage_styled";
import { useFind } from "../API/FetchAPI";
import useInputValidate from "../hooks/InputValidata";
import { LargeButtonB } from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { FindPWData } from "../type/type";

const FindPasswordPage: React.FC = () => {
  const { emailMessage, userInfo, setUserInfo, inputHandler } =
    useInputValidate({ email: "" });

  const mutation = useFind(userInfo);

  const handleFindPWSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputHandler(userInfo).findPwPage) {
      mutation.mutate();
    }
  };

  return (
    <FindPasswordPageContainer>
      <FindPasswordPageImage />
      <FindPasswordFormDiv>
        <FindPasswordFormContainer onSubmit={handleFindPWSumbit}>
          <FindPasswordFormItem>
            <h2>비밀번호 찾기</h2>
            <InputComponent
              type="email"
              name="email"
              labelText="이메일"
              placeholder="이메일을 입력해주세요"
              stateValue={userInfo}
              setStateValue={setUserInfo}
              errorMessage={emailMessage}
            />
            <div className="button-container">
              <LargeButtonB value="다음" />
            </div>
          </FindPasswordFormItem>
        </FindPasswordFormContainer>
        <span className="not-have-account">
          아직 계정이 없으신가요?<Link to="/signup">회원가입</Link>
        </span>
      </FindPasswordFormDiv>
    </FindPasswordPageContainer>
  );
};

export default FindPasswordPage;
