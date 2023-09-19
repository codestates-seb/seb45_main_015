import React from "react";
import {
  ChangePasswordPageContainer,
  ChangePasswordPageImage,
  ChangePasswordFormDiv,
  ChangePasswordFormItem,
  ChangePasswordFormContainer,
} from "./page_style/ChangePasswordPage_style";
import { useChange } from "../API/FetchAPI";
import useInputValidate from "../hooks/InputValidata";
import InputComponent from "../components/InputComponent";
import { LargeButtonB } from "../components/ButtonComponent";
import { ChangePWData } from "../type/type";

const ChangePasswordPage: React.FC = () => {
  const { passwordMessage, userInfo, setUserInfo, inputHandler } =
    useInputValidate({ newPassword: "", confirmPassword: "" });

  const handleChangePWSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 비밀번호 입력확인
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      console.log("두 번호가 맞지않음");
    } else {
      inputHandler(userInfo).changePwPage ? useChange(userInfo) : null;
    }
  };

  return (
    <ChangePasswordPageContainer>
      <ChangePasswordPageImage />
      <ChangePasswordFormDiv>
        <ChangePasswordFormContainer onSubmit={handleChangePWSumbit}>
          <ChangePasswordFormItem>
            <h2>비밀번호 변경</h2>
            <InputComponent
              type="password"
              name="newPassword"
              labelText="새로운 비밀번호"
              placeholder="새로운 비밀번호를 입력해주세요"
              stateValue={userInfo.newPassword}
              setStateValue={setUserInfo}
              errorMessage={passwordMessage}
            />
            <InputComponent
              type="password"
              name="confirmPassword"
              labelText="비밀번호 확인"
              placeholder="다시한번 비밀번호를 입력해주세요"
              stateValue={userInfo.confirmPassword}
              setStateValue={setUserInfo}
              errorMessage={passwordMessage}
            />
            <span className="password-convention">
              특수문자, 소문자, 숫자를 조합하여 8자리 이상 16자리 이하로
              입력해주세요.
            </span>
            <div className="button-container">
              <LargeButtonB value="변경하기" />
            </div>
          </ChangePasswordFormItem>
        </ChangePasswordFormContainer>
      </ChangePasswordFormDiv>
    </ChangePasswordPageContainer>
  );
};

export default ChangePasswordPage;
