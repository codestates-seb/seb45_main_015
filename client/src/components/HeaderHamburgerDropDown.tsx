import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  HamburgerContainer,
} from "./components_style/HeaderHamburgerDropDown_styled";
import { useLogout } from "../API/FetchAPI";
import { LoginStateContext } from "../context/LoginStateContext";

type LoginType = {
  loginState: boolean;
};

function HeaderHamburgerDropDown({ loginState }: LoginType) {
  const mutation = useLogout();
  const { currentLogin } = useContext(LoginStateContext);

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
        {loginState ? (
          <>
            <Button>
              <Link to="/mypage">마이페이지</Link>
            </Button>
            <Button
              onClick={() => {
                mutation.mutate();
                currentLogin.current = false;
              }}
            >
              {/* 로그아웃 함수 추가 */}
              로그아웃
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
