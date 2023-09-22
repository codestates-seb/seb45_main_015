import React, { useEffect } from "react";

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

  const guestMember = localStorage.getItem("memberName") === "Guest";

  // 입력한 값 평가와 에러메세지
  const {
    nickNameMessage,
    passwordMessage,
    userInfo,
    setUserInfo,
    inputHandler,
  } = useInputValidate({ nickname: "", newPassword: "", confirmPassword: "" });

  const changeNickName = useChangeNickname({
    newNickname: userInfo.nickname as string,
  });
  const changePassword = useChangePassword({
    old_password: userInfo.newPassword as string,
    new_password: userInfo.confirmPassword as string,
  });

  const changeUserHandler = () => {
    // e.preventDefault();

    // 닉네임과 비밀번호를 분리
    const isNickName = inputHandler(userInfo).myPageNickName;
    const isPassword = inputHandler(userInfo).myPagePassword;
    const newPasswordMatches =
      userInfo.newPassword === userInfo.confirmPassword;

    // 새로운 사용자 이름만 입력된 경우
    if (isNickName) {
      changeNickName.mutate();
    }
    // 새로운 비밀번호만 입력된 경우
    else if (!isNickName && isPassword && newPasswordMatches) {
      changePassword.mutate();
    }
    // 새로운 사용자 이름과 새 비밀번호가 모두 입력된 경우
    else if (isNickName && isPassword && newPasswordMatches) {
      changeNickName.mutate();
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
          <>
            <Section>
              <SubTitle>회원정보 수정</SubTitle>
              <InputComponent
                type="text"
                name="text"
                labelText="현재 사용자 이름"
                placeholder={""}
                nameValue={guestMember ? "게스트" : data.nickname}
                setStateValue={setUserInfo}
              />
              <InputComponent
                type="text"
                name="nickname"
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
                nameValue={guestMember ? "게스트" : data.email}
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
              <button
                className="change-mydata"
                onClick={() => changeUserHandler()}
              >
                수정하기
              </button>
            </Section>
          </>
        )}
      </MyPageContainer>
    </Container>
  );
}

export default MyPage;
