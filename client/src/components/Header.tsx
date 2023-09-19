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
  HamburgerWrapper,
  HeaderContainer,
} from "./components_style/Header_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import HeaderDropDown from "./HeaderDropDown";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderSearchDropDown from "./HeaderSearchDropDown";
import HeaderHamburgerDropDown from "./HeaderHamburgerDropDown";

const Nav = [
  { page: "둘러보기", router: "/allList" },
  { page: "상품등록", router: "/registrate" },
  { page: "나의거래", router: "/mytrade" },
];

const dummy = "로그아웃";

function Header() {
  const [mypagedropDown, setMypageDropDown] = useState(false);
  const [searchdropDown, setSearchDropDown] = useState(false);
  const [hamburgerdropDown, setHamburgerDropDown] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();

  const handleShowMypageDropDown = () => {
    setMypageDropDown(true);
  };

  const handleHideMypageDropDown = () => {
    setMypageDropDown(false);
  };

  const handleSearchDropDown = () => {
    setSearchDropDown(!searchdropDown);
    setHamburgerDropDown(false);
  };

  const handleHamburgerDropDown = () => {
    setHamburgerDropDown(!hamburgerdropDown);
    setSearchDropDown(false);
  };
  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (keyWord.length !== 0) {
      return navigate(`/search/${keyWord}`);
    }
  };
  return (
    <Container>
      <HeaderContainer>
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
              <Search
                type="text"
                placeholder="제목 검색"
                value={keyWord}
                onChange={e => setKeyWord(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <SearchButton onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </SearchButton>
            </SearchForm>
          </SearchWrapper>
          <UserWrapper>
            {!searchdropDown && (
              <Button
                className="header-icon header-screen-1024px"
                onClick={handleSearchDropDown}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            )}
            {isLogin ? (
              <>
                <Button className="header-icon">
                  <Link to="/favorite">
                    <FontAwesomeIcon icon={faHeart} />
                  </Link>
                </Button>
                <Button
                  className="header-icon header-dropdown"
                  onMouseEnter={handleShowMypageDropDown}
                  onMouseLeave={handleHideMypageDropDown}
                >
                  <FontAwesomeIcon icon={faUser} />
                  {mypagedropDown && <HeaderDropDown />}
                </Button>
              </>
            ) : (
              dummy === "로그아웃" && (
                <Button>
                  <Link to="/login">로그인</Link>
                </Button>
              )
            )}
          </UserWrapper>
          <HamburgerWrapper>
            {!searchdropDown && (
              <Button
                className="header-icon search-icon"
                onClick={handleSearchDropDown}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            )}
            <Button className="header-icon hamburger-icon">
              <FontAwesomeIcon
                icon={faBars}
                onClick={handleHamburgerDropDown}
              />
            </Button>
          </HamburgerWrapper>
        </HeaderContent>
        {searchdropDown && (
          <HeaderSearchDropDown handleSearchDropDown={handleSearchDropDown} />
        )}
        {hamburgerdropDown && <HeaderHamburgerDropDown />}
      </HeaderContainer>
    </Container>
  );
}

export default Header;
