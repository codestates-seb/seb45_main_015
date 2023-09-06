import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChangePasswordPageContainer,
  ChangePasswordPageImage,
  ChangePasswordFormDiv,
  ChangePasswordFormItem,
  ChangePasswordFormContainer,
} from "./page_style/ChangePasswordPage_style";
// import {} from "../API/FetchAPI";
import InputComponent from "../components/InputComponent";

const ChangePasswordPage: React.FC = () => {
  return (
    <ChangePasswordPageContainer>
      <ChangePasswordPageImage />
      <ChangePasswordFormDiv>
        <ChangePasswordFormContainer>
          <ChangePasswordFormItem>
            <h2>비밀번호 변경</h2>
            <InputComponent
              labelText="새 비밀번호"
              type="password"
              name="password"
              placeholder="새로운 비밀번호를 입력해주세요"
            />
            <InputComponent
              labelText="비밀번호확인"
              type="password"
              name="password"
              placeholder="위와 같은 비밀번호를 입력해주세요"
            />
            <span className="password-convention">
              특수문자, 소문자, 숫자를 조합하여 8자리 이상 16자리 이하로
              입력해주세요.
            </span>
            <button
              className="change-btn"
              onClick={e => {
                e.preventDefault();
              }}
            >
              변경하기
            </button>
          </ChangePasswordFormItem>
        </ChangePasswordFormContainer>
      </ChangePasswordFormDiv>
    </ChangePasswordPageContainer>
  );
};

export default ChangePasswordPage;
