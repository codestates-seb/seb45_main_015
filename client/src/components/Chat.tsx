import { useState } from "react";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import { Container } from "./components_style/Chat_styled";

function Chat() {
  const [currentActive, setCurrentActive] = useState<string>("List");

  const handleActiveChange = (active: string) => {
    setCurrentActive(active);
  };

  return (
    <Container>
      {currentActive === "List" && (
        <ChatList handleActiveChange={active => handleActiveChange(active)} />
      )}
      {currentActive === "Room" && (
        <ChatRoom handleActiveChange={active => handleActiveChange(active)} />
      )}
    </Container>
  );
}

export default Chat;
