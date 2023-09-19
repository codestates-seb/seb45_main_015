import styled from "styled-components";

export const Container = styled.footer`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  border-top: solid 1px #e6e8ec;
  bottom: 0;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 1120px;
  margin: 0 auto;

  @media (max-width: 768px) {
    & {
      align-items: start;
      flex-direction: column;
      width: auto;
    }
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 200px;

  @media (max-width: 768px) {
    & {
      height: 48px;
      width: 120px;
    }
  }
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;

  @media (max-width: 768px) {
    & {
      width: 100%;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 60px;

  @media (max-width: 768px) {
    & {
      margin-left: 0;
      margin-top: 30px;
    }

    &:not(:first-of-type) {
      margin-left: 40px;
    }
  }
`;

export const Title = styled.p`
  margin: 0;
  font-size: 18px;
  color: #808080;
  white-space: nowrap;
  line-height: 1;

  @media (max-width: 768px) {
    & {
      font-size: 14px;
    }
  }
`;

export const Address = styled.a`
  cursor: pointer;
  font-size: 18px;
  color: #2a2a2a;
  margin-top: 10px;

  @media (max-width: 768px) {
    & {
      font-size: 14px;
    }
  }
`;
