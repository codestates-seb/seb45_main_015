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
import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

function ChatRoom({
  handleActiveChange,
}: {
  handleActiveChange: (active: string) => void;
}) {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("ws://15.164.84.204:8080/ws-015/websocket");

    socket.on("connect", () => {
      console.log("WebSocket 연결 성공");
    });

    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    setSocket(socket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [messages]);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit("message", message);
      setMessage("");
    }
  };

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
        {messages.map((message, index) => (
          <Message key={index} className="another-user-message">
            <MessageWrapper className="another-user-message">
              <Text className="another-user-message">{message}</Text>
            </MessageWrapper>
            <Text className="message-time">2:07 PM</Text>
          </Message>
        ))}
      </Main>
      <Chatting>
        <ChattingArea />
        <SendButton onClick={sendMessage}>
          <FontAwesomeIcon icon={faEnvelope} />
        </SendButton>
      </Chatting>
    </Container>
  );
}

export default ChatRoom;
