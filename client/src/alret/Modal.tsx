import {
  Button,
  ButtonWrapper,
  Container,
  Content,
  StarButton,
  StarWrapper,
  Text,
  TextWrapper,
} from "./style/Modal.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";

type Modes = {
  [key: string]: {
    mode: string;
    text: string;
  };
};

const modes: Modes = {
  star: {
    mode: "star",
    text: "거래는 만족스러웠습니까?\n 별점을 남겨주세요!",
  },
  favorite: {
    mode: "favorite",
    text: `선택한 상품을 찜목록에서\n 제거하시겠습니까?`,
  },
  registered: {
    mode: "registered",
    text: "등록 후 입찰자가 생길 시 취소나 수정이 불가능합니다!",
  },
};

function Modal({ mode, closeModal }: { mode: string; closeModal: () => void }) {
  const [star, setStar] = useState<number>(3);
  const currentMode = modes[mode];

  const handleStarClick = (index: number) => {
    setStar(index + 1);
  };

  return (
    <Container>
      <Content>
        <TextWrapper>
          <Text>
            {currentMode.text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Text>
        </TextWrapper>
        {currentMode.mode === "star" && (
          <StarWrapper>
            {Array.from({ length: 5 }, (_, index) => (
              <StarButton key={index} onClick={() => handleStarClick(index)}>
                <FontAwesomeIcon
                  icon={index < star ? solidStar : regularStar}
                />
              </StarButton>
            ))}
          </StarWrapper>
        )}
        <ButtonWrapper>
          <Button onClick={closeModal}>
            {currentMode.mode !== "registered" ? "확인" : "등록하기"}
          </Button>
          {currentMode.mode !== "star" && (
            <Button className="modal-cancel">취소</Button>
          )}
        </ButtonWrapper>
      </Content>
    </Container>
  );
}

export default Modal;
