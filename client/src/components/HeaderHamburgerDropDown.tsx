import { Link } from "react-router-dom";
import {
  Button,
  Container,
  HamburgerContainer,
} from "./components_style/HeaderHamburgerDropDown_styled";

function HeaderHamburgerDropDown() {
  return (
    <Container>
      <HamburgerContainer>
        <Link to="/allList">
          <Button>둘러보기</Button>
        </Link>
        <Link to="/registrate">
          <Button>상품등록</Button>
        </Link>
        <Link to="/mytrade">
          <Button>나의거래</Button>
        </Link>
        <Link to="/">
          <Button>찜목록</Button>
        </Link>
        <Link to="/mypage">
          <Button>마이페이지</Button>
        </Link>
        <Link to="/">
          <Button>로그아웃</Button>
        </Link>
        <Link to="/login">
          <Button>로그인</Button>
        </Link>
      </HamburgerContainer>
    </Container>
  );
}
export default HeaderHamburgerDropDown;
