import {
  Container,
  Icon,
  SearchContainer,
  SearchContent,
  SearchForm,
  SearchInput,
  Title,
  Wrapper,
} from "./components_style/HeaderSearchDropDown_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderSearchDropDownProps {
  handleSearchDropDown: React.MouseEventHandler;
}

function HeaderSearchDropDown({
  handleSearchDropDown,
}: HeaderSearchDropDownProps) {
  // 검색기능----------------------------
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();
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
      <SearchContainer>
        <SearchContent>
          <Wrapper className="search-title-wrapper">
            <Title>검색</Title>
            <Icon className="close-icon" onClick={handleSearchDropDown}>
              <FontAwesomeIcon icon={faXmark} />
            </Icon>
          </Wrapper>
          <Wrapper>
            <SearchForm>
              <SearchInput
                placeholder="검색어를 입력하세요."
                type="text"
                value={keyWord}
                onChange={e => setKeyWord(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Icon className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Icon>
            </SearchForm>
          </Wrapper>
        </SearchContent>
      </SearchContainer>
    </Container>
  );
}
export default HeaderSearchDropDown;
