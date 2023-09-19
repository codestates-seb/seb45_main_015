import React from "react";

import { LargeButtonB } from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import {
  usefetchMyPage,
  useChangeNickname,
  useChangePassword,
} from "../API/FetchAPI";
import useInputValidate from "../hooks/InputValidata";
import {
  Container,
  MyPageContainer,
  Section,
  SubTitle,
  Title,
} from "./page_style/MyPage_styled";
import Loading from "../loading/Loading";

function MyPage() {
  const { data, isLoading } = usefetchMyPage();

  // 입력한 값 평가와 에러메세지
  const {
    nickNameMessage,
    passwordMessage,
    userInfo,
    setUserInfo,
    inputHandler,
  } = useInputValidate({ nickname: "", newPassword: "", confirmPassword: "" });

  const changeNickName = useChangeNickname(userInfo);
  const changePassword = useChangePassword(userInfo);

  const changeUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 닉네임과 비밀번호를 분리?
    const { isNickName, isPassword } = inputHandler(userInfo).myPage;
    const newPasswordMatches =
      userInfo.newPassword === userInfo.confirmPassword;
    // 입력된 정보를 평가해서 닉네임 유효성검사를 통과한 경우
    if (isNickName) {
      changeNickName.mutate();
      // 비밀번호 유효성 검사를 통과하고 새로운비밀번호와 비밀번호 확인이 일치하는 경우
      if (isPassword && newPasswordMatches) {
        changePassword.mutate();
      }
      // 입력된 정보를 평가해서 비밀번호 유효성 검사를 통과하고 새로운비밀번호와 비밀번호 확인이 일치하는 경우
    } else if (isPassword && newPasswordMatches) {
      changePassword.mutate();
    }
  };

  // 사용자 별점 추가해야함

  return (
    <Container>
      <MyPageContainer>
        <Title>마이페이지</Title>
        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={changeUserHandler}>
            <Section>
              <SubTitle>회원정보 수정</SubTitle>
              <InputComponent
                type="text"
                name="text"
                labelText="현재 사용자 이름"
                placeholder={""}
                nameValue={data.nickname}
                setStateValue={setUserInfo}
              />
              <InputComponent
                type="text"
                name="text"
                labelText="새로운 사용자 이름"
                placeholder="변경하실 이름을 입력해주세요"
                stateValue={userInfo}
                setStateValue={setUserInfo}
                errorMessage={nickNameMessage}
              />
              <InputComponent
                type="email"
                name="email"
                labelText="사용중인 이메일"
                placeholder={""}
                nameValue={data.email}
                setStateValue={setUserInfo}
              />
            </Section>
            <Section>
              <SubTitle>비밀번호 변경</SubTitle>
              <InputComponent
                type="password"
                name="newPassword"
                labelText="새 비밀번호 입력"
                placeholder="새로운 비밀번호"
                stateValue={userInfo.newPassword}
                setStateValue={setUserInfo}
                errorMessage={passwordMessage}
              />
              <InputComponent
                type="password"
                name="confirmPassword"
                labelText="비밀번호 확인"
                placeholder="비밀번호 확인"
                stateValue={userInfo.confirmPassword}
                setStateValue={setUserInfo}
                errorMessage={passwordMessage}
              />
            </Section>
            <Section>
              <SubTitle>소셜로그인</SubTitle>
              <InputComponent
                type="email"
                name="email"
                labelText="웹사이트 URL"
                placeholder=""
                stateValue={userInfo}
                setStateValue={setUserInfo}
              />
            </Section>
            <Section className="mypage-button-section">
              <LargeButtonB value="수정하기" />
            </Section>
          </form>
        )}
      </MyPageContainer>
    </Container>
  );
}

export default MyPage;
