import {
  Container,
  LogoWrapper,
  Logo,
  NavWrapper,
  Button,
  HeaderContent,
  SearchWrapper,
  SearchForm,
  Search,
  SearchButton,
  UserWrapper,
} from "./components_style/Header_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import HeaderDropDown from "./HeaderDropDown";

const Nav = [
  { page: "Home", router: "/" },
  { page: "상품등록", router: "/" },
  { page: "나의거래", router: "/" },
];

const dummy = "로그아웃";

function Header() {
  return (
    <Container>
      <HeaderContent>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <NavWrapper>
          {Nav.map(nav => (
            <Button key={nav.page}>{nav.page}</Button>
          ))}
        </NavWrapper>
        <SearchWrapper>
          <SearchForm>
            <Search placeholder="검색" />
            <SearchButton>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchButton>
          </SearchForm>
        </SearchWrapper>
        {dummy !== "로그아웃" ? (
          <UserWrapper>
            <Button className="Icon screen-1024px">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            <Button>회원가입</Button>
            <Button>로그인</Button>
          </UserWrapper>
        ) : (
          <UserWrapper>
            <Button className="Icon screen-1024px">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            <Button className="Icon">
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <Button className="Icon">
              <FontAwesomeIcon icon={faUser} />
              <HeaderDropDown />
            </Button>
          </UserWrapper>
        )}
        <Button className="Icon screen-768px">
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </HeaderContent>
    </Container>
  );
}
export default Header;
