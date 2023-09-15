import { MediumButtonB, MediumButtonD } from "./ButtonComponent";
import {
  Container,
  Content,
  Title,
  Wrapper,
} from "./components_style/RegistrateSpecification_styled";

function RegistrateSpecification() {
  return (
    <Container>
      <Content>
        <Title>명세서</Title>
        <Wrapper>
          <MediumButtonB value="등록하기" />
          <MediumButtonD value="취소하기" />
        </Wrapper>
      </Content>
    </Container>
  );
}

export default RegistrateSpecification;
