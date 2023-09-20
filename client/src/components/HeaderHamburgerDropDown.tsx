import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  HamburgerContainer,
} from "./components_style/HeaderHamburgerDropDown_styled";
import { LoginStateContext } from "../context/LoginStateContext";

function HeaderHamburgerDropDown() {
  const { isLogin, setIsLogin } = useContext(LoginStateContext);

  return (
    <Container>
      <HamburgerContainer>
        <Button>
          <Link to="/allList">둘러보기</Link>
        </Button>
        <Button>
          <Link to="/registrate">상품등록</Link>
        </Button>
        <Button>
          <Link to="/mytrade">나의거래</Link>
        </Button>
        <Button>
          <Link to="/favorite">찜목록</Link>
        </Button>
        {isLogin ? (
          <>
            <Button>
              <Link to="/mypage">마이페이지</Link>
            </Button>
            <Button>
              {/* 로그아웃 함수 추가 */}
              <Link to="/">로그아웃</Link>
            </Button>
          </>
        ) : (
          <Button>
            <Link to="/login">로그인</Link>
          </Button>
        )}
      </HamburgerContainer>
    </Container>
  );
}
export default HeaderHamburgerDropDown;
