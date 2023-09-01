import {
  Container,
  LogoWrapper,
  Logo,
  NavWrapper,
<<<<<<< HEAD
  Button,
=======
  NavButton,
>>>>>>> 77e86a3 (feat: header제작)
  HeaderContent,
  SearchWrapper,
  SearchForm,
  Search,
  SearchButton,
  UserWrapper,
<<<<<<< HEAD
} from "./style/Header.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import HeaderDropDown from "./HeaderDropDown";
=======
  UserButton,
} from "./style/Header.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
>>>>>>> 77e86a3 (feat: header제작)

const Nav = [
  { page: "Home", router: "/" },
  { page: "상품등록", router: "/" },
  { page: "나의거래", router: "/" },
];

<<<<<<< HEAD
const dummy = "로그아웃";

=======
>>>>>>> 77e86a3 (feat: header제작)
function Header() {
  return (
    <Container>
      <HeaderContent>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <NavWrapper>
          {Nav.map(nav => (
<<<<<<< HEAD
            <Button key={nav.page}>{nav.page}</Button>
=======
            <NavButton>{nav.page}</NavButton>
>>>>>>> 77e86a3 (feat: header제작)
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
<<<<<<< HEAD
        {dummy !== "로그아웃" ? (
          <UserWrapper>
            <Button>회원가입</Button>
            <Button>로그인</Button>
          </UserWrapper>
        ) : (
          <UserWrapper>
            <Button className="Icon">
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <Button className="Icon">
              <FontAwesomeIcon icon={faUser} />
              <HeaderDropDown />
            </Button>
          </UserWrapper>
        )}
=======
        <UserWrapper>
          <UserButton>회원가입</UserButton>
          <UserButton>로그인</UserButton>
        </UserWrapper>
>>>>>>> 77e86a3 (feat: header제작)
      </HeaderContent>
    </Container>
  );
}
export default Header;
