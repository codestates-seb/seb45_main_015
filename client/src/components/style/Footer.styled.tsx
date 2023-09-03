import styled from "styled-components";

export const Container = styled.footer`
  display: flex;
  align-items: center;
  width: auto;
  height: 264px;
  border-top: solid 1px #e6e8ec;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1120px;
  height: auto;
  margin: 0 auto;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #e6e8ec;
  border-radius: 16px;
  width: 192px;
  height: 150px;

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
`;

export const Logo = styled.img`
  overflow: hidden;
  width: 192px;
  height: 150px;
  border-radius: 16px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  margin-left: 42px;

  @media (max-width: 1024px) {
    &.footer-git {
      display: none;
    }
  }
`;

export const ContentsPart = styled.div`
  display: flex;

  @media (max-width: 768px) {
    & {
      flex-direction: column;
    }
  }
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:not(:last-of-type) {
    margin-right: 30px;
  }
`;

export const Theme = styled.h3`
  margin: 0;
  white-space: nowrap;
`;
export const TextWrapper = styled.div`
  display: flex;
  margin-top: 5px;
`;

export const Text = styled.p`
  margin: 5px 0 0 0;
  white-space: nowrap;

  &:not(:last-of-type) {
    margin-right: 15px;
  }
`;
