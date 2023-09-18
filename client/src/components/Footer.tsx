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
          <Logo src="https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-horiz-500x200-2c50-d.png" />
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
