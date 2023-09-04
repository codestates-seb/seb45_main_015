import styled from "styled-components";

const CategoryNav = styled.div`
  width: 240px;

  & h2 {
    margin: 48px 0 56px 0;
    font-family: "Gmarket Sans TTF";
    font-size: 28px;
    font-weight: 700;
  }

  & ul {
    padding: 0;
  }

  & li {
    height: 56px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: #000;
    font-family: "Gmarket Sans TTF";
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }

  & li:hover {
    color: #0056b3;
  }
`;

export default CategoryNav;
