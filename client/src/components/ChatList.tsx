import {
  Chat,
  ChatInner,
  ChatTitle,
  ChatWrapper,
  Container,
  Header,
  Icon,
  Image,
  Main,
  ProfileWrapper,
  Text,
  Title,
} from "./components_style/ChatList_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function ChatList({
  handleActiveChange,
}: {
  handleActiveChange: (active: string) => void;
}) {
  return (
    <Container>
      <Header>
        <Title>채팅리스트</Title>
      </Header>
      <Main>
        {Array.from({ length: 15 }, (_, index) => (
          <Chat key={index} onClick={() => handleActiveChange("Room")}>
            <ProfileWrapper>
              <Image />
            </ProfileWrapper>
            <ChatWrapper>
              <ChatInner>
                <ChatTitle>상품명</ChatTitle>
                <Text className="chat-user-name">사용자 이름</Text>
              </ChatInner>
              <Text>안녕하세요</Text>
            </ChatWrapper>
            <Icon>
              <FontAwesomeIcon icon={faChevronRight} />
            </Icon>
          </Chat>
        ))}
      </Main>
    </Container>
  );
}

export default ChatList;
