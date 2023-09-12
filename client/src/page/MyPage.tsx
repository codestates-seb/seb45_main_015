import { LargeButtonB } from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import {
  Container,
  MyPageContainer,
  Section,
  SubTitle,
  Title,
} from "./page_style/MyPage_styled";

function MyPage() {
  return (
    <Container>
      <MyPageContainer>
        <Title>마이페이지</Title>
        <Section>
          <SubTitle>회원정보 수정</SubTitle>
          {/* <InputComponent
            labelText={"현재 사용자 이름"}
            placeholder={"현재 사용자이름"}
          />
          <InputComponent
            labelText={"새로운 사용자 이름"}
            placeholder={"변경하실 이름을 입력해주세요"}
          />
          <InputComponent
            labelText={"이메일"}
            placeholder={"abc@example.com"}
          /> */}
        </Section>
        <Section>
          <SubTitle>비밀번호 변경</SubTitle>
          {/* <InputComponent
            labelText={"새 비밀번호 입력"}
            placeholder={"새로운 비밀번호"}
          />
          <InputComponent
            labelText={"비밀번호 확인"}
            placeholder={"비밀번호 입력"}
          /> */}
        </Section>
        <Section>
          <SubTitle>소셜로그인</SubTitle>
          {/* <InputComponent
            labelText={"웹 사이트"}
            placeholder={"웹 사이트 URL"}
          /> */}
        </Section>
        <Section className="mypage-button-section">
          <LargeButtonB value="수정하기" />
        </Section>
      </MyPageContainer>
    </Container>
  );
}

export default MyPage;
