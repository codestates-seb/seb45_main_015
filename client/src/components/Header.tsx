import {
  Container,
  LogoWrapper,
  Logo,
  NavWrapper,
  NavButton,
  HeaderContent,
  SearchWrapper,
  SearchForm,
  Search,
  SearchButton,
  UserWrapper,
  UserButton,
} from "./style/Header.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Nav = [
  { page: "Home", router: "/" },
  { page: "상품등록", router: "/" },
  { page: "나의거래", router: "/" },
];

function Header() {
  return (
    <Container>
      <HeaderContent>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <NavWrapper>
          {Nav.map(nav => (
            <NavButton>{nav.page}</NavButton>
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
        <UserWrapper>
          <UserButton>회원가입</UserButton>
          <UserButton>로그인</UserButton>
        </UserWrapper>
      </HeaderContent>
    </Container>
  );
}
export default Header;
