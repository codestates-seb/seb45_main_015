import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FindPasswordPageContainer,
  FindPasswordPageImage,
  FindPasswordFormDiv,
  FindPasswordFormItem,
  FindPasswordFormContainer,
} from "./page_style/FindPasswordPage_styled";
import { useFind } from "../API/FetchAPI";
import InputComponent from "../components/InputComponent";

const FindPasswordPage: React.FC = () => {
  const [findEmail, setFindEmail] = useState<string>("");

  return (
    <FindPasswordPageContainer>
      <FindPasswordPageImage />
      <FindPasswordFormDiv>
        <FindPasswordFormContainer>
          <FindPasswordFormItem>
            <h2>비밀번호 찾기</h2>
            <label>이메일</label>
            <InputComponent
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
            />
            <button
              className="next-btn"
              onClick={e => {
                e.preventDefault();
                useFind(findEmail);
              }}
            >
              다음
            </button>
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
