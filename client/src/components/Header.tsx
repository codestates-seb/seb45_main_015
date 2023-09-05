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
import { Link } from "react-router-dom";

const Nav = [
  { page: "둘러보기", router: "/" },
  { page: "상품등록", router: "/registrate" },
  { page: "나의거래", router: "/" },
];

const dummy = "로그아웃";

function Header() {
  return (
    <Container>
      <HeaderContent>
        <Link to="/">
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </Link>
        <NavWrapper>
          {Nav.map(nav => (
            <Button key={nav.page}>
              <Link to={nav.router}>{nav.page}</Link>
            </Button>
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
            <Button className="header-icon header-screen-1024px">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            <Button>
              <Link to="/login">로그인</Link>
            </Button>
          </UserWrapper>
        ) : (
          <UserWrapper>
            <Button className="header-icon header-screen-1024px">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            <Button className="header-icon">
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <Button className="header-icon">
              <FontAwesomeIcon icon={faUser} />
              <HeaderDropDown />
            </Button>
          </UserWrapper>
        )}
        <Button className="header-icon header-screen-768px">
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </HeaderContent>
    </Container>
  );
}
export default Header;
