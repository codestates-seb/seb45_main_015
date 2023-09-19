import {
  Address,
  Container,
  FooterContent,
  InfoContainer,
  Logo,
  LogoWrapper,
  Title,
  Wrapper,
} from "./components_style/Footer.styled_styled";
import logo from "../images/LogoImg.png";

const member = {
  BE: [
    { name: "이경찬", link: "#" },
    { name: "이재우", link: "#" },
    { name: "김재한", link: "#" },
  ],
  FE: [
    { name: "김종회", link: "#" },
    { name: "권순범", link: "#" },
    { name: "김태수", link: "#" },
  ],
  WorkSpace: [
    { name: "GitHub", link: "#" },
    { name: "Figma", link: "#" },
  ],
};

function Footer() {
  return (
    <Container>
      <FooterContent>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
        <InfoContainer>
          <Wrapper>
            <Title>BE Member</Title>
            {member.BE.map(member => (
              <Address key={member.name} href={member.link}>
                {member.name}
              </Address>
            ))}
          </Wrapper>
          <Wrapper>
            <Title>FE Member</Title>
            {member.FE.map(member => (
              <Address key={member.name} href={member.link}>
                {member.name}
              </Address>
            ))}
          </Wrapper>
          <Wrapper>
            <Title>WorkSpace</Title>
            {member.WorkSpace.map(member => (
              <Address key={member.name} href={member.link}>
                {member.name}
              </Address>
            ))}
          </Wrapper>
        </InfoContainer>
      </FooterContent>
    </Container>
  );
}

export default Footer;
