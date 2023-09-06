import styled from "styled-components";

const CategoryNav = styled.div`
  width: 187px;
  margin-right: 10px;
  border: 1px solid red;

  & h2 {
    margin: 48px 0 56px 0;
    font-family: "Gmarket Sans TTF";
    font-size: 1.5rem;
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
    white-space: nowrap;
  }

  & li:hover {
    color: #0056b3;
  }
`;

export default CategoryNav;
