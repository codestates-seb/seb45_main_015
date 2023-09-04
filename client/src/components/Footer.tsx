import {
  Container,
  ContentsPart,
  FooterContent,
  Logo,
  LogoWrapper,
  Text,
  TextContainer,
  TextSection,
  TextWrapper,
  Theme,
} from "./components_style/Footer.styled";

const member = {
  BE: [
    { name: "BE 이경찬", git: "example@github.com" },
    { name: "BE 이재우", git: "example@github.com" },
    { name: "BE 김재한", git: "example@github.com" },
  ],
  FE: [
    { name: "FE 김종회", git: "example@github.com" },
    { name: "FE 권순범", git: "example@github.com" },
    { name: "FE 김태수", git: "example@github.com" },
  ],
};

function Footer() {
  return (
    <Container>
      <FooterContent>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <TextContainer>
          <Theme>BlackList 팀원</Theme>
          <ContentsPart>
            <TextSection>
              {member.BE.map(member => (
                <TextWrapper key={member.name}>
                  <Text>{member.name}</Text>
                  <Text>{member.git}</Text>
                </TextWrapper>
              ))}
            </TextSection>
            <TextSection>
              {member.FE.map(member => (
                <TextWrapper key={member.name}>
                  <Text>{member.name}</Text>
                  <Text>{member.git}</Text>
                </TextWrapper>
              ))}
            </TextSection>
          </ContentsPart>
        </TextContainer>
        <TextContainer className="footer-git">
          <TextSection>
            <Theme>깃허브</Theme>
            <TextWrapper>
              <a>https://github.com/</a>
            </TextWrapper>
          </TextSection>
        </TextContainer>
      </FooterContent>
    </Container>
  );
}

export default Footer;
