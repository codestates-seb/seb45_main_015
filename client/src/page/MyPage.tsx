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

  const {
    nickNameMessage,
    passwordMessage,
    userInfo,
    setUserInfo,
    inputHandler,
  } = useInputValidate({ nickname: "", password: "" });

  const changeNickName = useChangeNickname(userInfo);
  const changePassword = useChangePassword(userInfo);

  const changeUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      inputHandler(userInfo).myPage.isNickName &&
      inputHandler(userInfo).myPage.isPassword
    ) {
      // changeNickName.mutate();
      // changePassword.mutate();
      return console.log(changeNickName);
    } else if (inputHandler(userInfo).myPage.isPassword) {
      // changePassword.mutate();
      return console.log(changePassword);
    } else {
      // changeNickName.mutate();
      return console.log(changeNickName);
    }
  };

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
                name="password"
                labelText="새 비밀번호 입력"
                placeholder="새로운 비밀번호"
                stateValue={userInfo}
                setStateValue={setUserInfo}
                errorMessage={passwordMessage}
              />
              <InputComponent
                type="password"
                name="password"
                labelText="비밀번호 확인"
                placeholder="비밀번호 확인"
                stateValue={userInfo}
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
