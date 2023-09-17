import {
  ChatTitle,
  Chatting,
  ChattingArea,
  Container,
  DateLine,
  DateWrapper,
  Header,
  Icon,
  Image,
  InfoInner,
  InfoWrapper,
  Main,
  Message,
  MessageWrapper,
  ProfileWrapper,
  SendButton,
  Text,
} from "./components_style/ChatRoom_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

function ChatRoom({
  handleActiveChange,
}: {
  handleActiveChange: (active: string) => void;
}) {
  return (
    <Container>
      <Header>
        <Icon onClick={() => handleActiveChange("List")}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Icon>
        <ProfileWrapper>
          <Image />
        </ProfileWrapper>
        <InfoWrapper>
          <InfoInner>
            <ChatTitle>상품명</ChatTitle>
            <Text className="chat-user-name">사용자 이름</Text>
          </InfoInner>
          <Text>user@example.com</Text>
        </InfoWrapper>
      </Header>
      <Main>
        {Array.from({ length: 15 }, (_, index) => (
          <Message key={index} className="another-user-message">
            <MessageWrapper className="another-user-message">
              <Text className="another-user-message">안녕하세요!</Text>
            </MessageWrapper>
            <Text className="message-time">2:07 PM</Text>
          </Message>
        ))}
        <Message className="user-message">
          <MessageWrapper className="user-message">
            <Text className="user-message">안녕하세요!</Text>
          </MessageWrapper>
          <Text>4:07 PM</Text>
        </Message>
        <DateWrapper>
          <DateLine></DateLine>
          <Text className="message-date">29 Sep 2023</Text>
          <DateLine></DateLine>
        </DateWrapper>
      </Main>
      <Chatting>
        <ChattingArea />
        <SendButton>
          <FontAwesomeIcon icon={faEnvelope} />
        </SendButton>
      </Chatting>
    </Container>
  );
}

export default ChatRoom;
