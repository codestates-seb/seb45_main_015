import styled from "styled-components";

export const StyledImage = styled.img`
  width: 1440px;
  height: 630px;
  display: block;
  margin: 0 auto;
  @media (min-width: 0px) {
    height: 350px;
  }
  @media (min-width: 1025px) {
    height: 450px;
  }
  @media (min-width: 1210px) {
    height: 580px;
  }
`;

export const StyledSlide = styled.div`
  text-align: center;
`;
