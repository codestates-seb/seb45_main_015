import styled from "styled-components";
<<<<<<< HEAD
import globalTokens from "../../design_tokens/global.json";
=======
>>>>>>> 77e86a3 (feat: header제작)

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 89px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0 160px;
`;

export const LogoWrapper = styled.div`
  width: 237px;
  height: 48px;
  padding-right: 42px;
<<<<<<< HEAD
  border-right: solid 1px ${globalTokens.heart.default.value};
=======
  border-right: solid 1px #e6e8ec;
>>>>>>> 77e86a3 (feat: header제작)
`;

export const Logo = styled.img`
  background-color: gray;
  width: 195px;
  height: 48px;
`;

export const NavWrapper = styled.div`
  display: flex;
  margin-left: 42px;
`;

<<<<<<< HEAD
export const Button = styled.button`
  cursor: pointer;
  padding: 0;
  border-style: none;
=======
export const NavButton = styled.button`
  border-style: none;
  border-radius: 12px;
>>>>>>> 77e86a3 (feat: header제작)
  background-color: #fff;
  font-size: 18px;
  color: #777e90;
  font-family: "Gmarket Sans";
  white-space: nowrap;
<<<<<<< HEAD
  transition: 0.5s ease-out;
  padding: 12px;

  &:hover {
    transition: 0.5s ease-out;
    color: ${globalTokens.Button.default.value};
  }

  &.Icon {
    font-size: 28px;
    margin-left: 10px;
=======
  padding: 16px;

  &:hover {
    background-color: #f0f0f0;
>>>>>>> 77e86a3 (feat: header제작)
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;
<<<<<<< HEAD
  padding: 0 15px 0 15px;
=======
  margin-right: 16px;
  padding-right: 15px;
>>>>>>> 77e86a3 (feat: header제작)
`;

export const SearchForm = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border: solid 1px #777e90;
  border-radius: 45px;
<<<<<<< HEAD
  padding-right: 15px;
=======
  padding-right: 10px;
>>>>>>> 77e86a3 (feat: header제작)
`;

export const Search = styled.input`
  outline: none;
  border-style: none;
  background-color: transparent;
  width: 100%;
<<<<<<< HEAD
  padding: 15px 5px 15px 15px;
=======
  margin: 15px;
>>>>>>> 77e86a3 (feat: header제작)
  font-size: 16px;
`;

export const SearchButton = styled.button`
  cursor: pointer;
  display: flex;
  border-style: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: #777e90;
`;

export const UserWrapper = styled.div`
  display: flex;
<<<<<<< HEAD
  margin-left: 15px;
=======
`;

export const UserButton = styled.button`
  border-style: none;
  border-radius: 12px;
  background-color: #fff;
  font-size: 18px;
  color: #777e90;
  font-family: "Gmarket Sans";
  white-space: nowrap;
  padding: 16px;

  &:hover {
    background-color: #f0f0f0;
  }
>>>>>>> 77e86a3 (feat: header제작)
`;
