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

interface HeaderSearchDropDownProps {
  handleSearchDropDown: React.MouseEventHandler;
}

function HeaderSearchDropDown({
  handleSearchDropDown,
}: HeaderSearchDropDownProps) {
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
              <SearchInput placeholder="검색어를 입력하세요." />
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
