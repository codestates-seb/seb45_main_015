import {
  Button,
  Container,
  HamburgerContainer,
} from "./components_style/HeaderHamburgerDropDown_styled";

function HeaderHamburgerDropDown() {
  return (
    <Container>
      <HamburgerContainer>
        <Button>둘러보기</Button>
        <Button>상품등록</Button>
        <Button>나의거래</Button>
        <Button>찜목록</Button>
        <Button>마이페이지</Button>
        <Button>로그아웃</Button>
        <Button>로그인</Button>
      </HamburgerContainer>
    </Container>
  );
}
export default HeaderHamburgerDropDown;
