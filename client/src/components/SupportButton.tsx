import {
  Button,
  ButtonTextWrapper,
  Container,
  Icon,
  Text,
} from "./components_style/SupportButton_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots as activateChat,
  faWindowMinimize,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faCommentDots as defaultChat } from "@fortawesome/free-regular-svg-icons";
import Chat from "./Chat";
import { useState } from "react";

function SupportButton() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // const handleChatOpen = () => {
  //   setIsChatOpen(!isChatOpen);
  // };

  return (
    <Container>
      {isChatOpen && <Chat />}
      <Button onClick={handleScrollToTop}>
        <ButtonTextWrapper>
          <Icon>
            <FontAwesomeIcon icon={faWindowMinimize} />
            <FontAwesomeIcon icon={faArrowUp} />
          </Icon>
          <Text className="top-button">Top</Text>
        </ButtonTextWrapper>
      </Button>
      {/* <Button>
        <ButtonTextWrapper onClick={handleChatOpen}>
          <Icon>
            <FontAwesomeIcon icon={defaultChat} />
          </Icon>
          <Text>Chat</Text>
        </ButtonTextWrapper>
      </Button> */}
    </Container>
  );
}

export default SupportButton;
