import React from "react";
import { Link } from "react-router-dom";
import {
  FindPasswordFormDiv,
  FindPasswordFormItem,
  FindPasswordFormContainer,
  FindPasswordFormInput,
} from "./component_style/FindPassword_style";

const FindPassword: React.FC = () => {
  return (
    <FindPasswordFormDiv>
      <FindPasswordFormContainer>
        <FindPasswordFormItem>
          <h2>비밀번호 찾기</h2>
          <label>이메일</label>
          <FindPasswordFormInput
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
          />
          <Link className="next-btn" to="/signup">
            다음
          </Link>
        </FindPasswordFormItem>
      </FindPasswordFormContainer>
      <span className="not-have-account">
        아직 계정이 없으신가요?<Link to="/signup">회원가입</Link>
      </span>
    </FindPasswordFormDiv>
  );
};

export default FindPassword;
