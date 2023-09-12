import styled from "styled-components";

export const Container = styled.div`
  display: none;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    & {
      display: flex;
    }
  }
`;

export const HamburgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 45px;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  height: 48px;
  width: 100%;
  font-size: 20px;
  border-style: none;
  background-color: transparent;
  transition: 0.5s ease-out;

  &:hover {
    color: #0064ff;
    transition: 0.5s ease-out;
  }

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;
