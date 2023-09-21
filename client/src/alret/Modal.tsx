import {
  Button,
  ButtonWrapper,
  Container,
  Content,
  StarButton,
  StarWrapper,
  Text,
  TextWrapper,
} from "./alret_style/Modal_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { ModalContainer } from "./alret_style/Modal_styled";

interface ModalProps {
  isOpen: any;
  onCancel: () => void;
  onConfirm: () => void;
}

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

export const Modal = ({
  mode,
  closeModal,
}: {
  mode: string;
  closeModal: () => void;
}) => {
  const [star, setStar] = useState<number>(3);
  const currentMode = modes[mode];

  const handleStarClick = (index: number) => {
    setStar(index + 1);
  };

  const handleBubbling = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Container onClick={closeModal}>
      <Content onClick={handleBubbling}>
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
          <Button className="modal-cancel" onClick={closeModal}>
            취소
          </Button>
        </ButtonWrapper>
      </Content>
    </Container>
  );
};

export default Modal;

//--------찜목록 모달

export const AllFavoriteModal: React.FC<ModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return isOpen ? (
    <ModalContainer>
      <div className="qwe" onClick={onCancel}></div>
      <div className="modalWrap">
        <p className="text">찜목록 모두를 삭제 하시겠습니까?</p>
        <div className="ButtonWrap">
          <div>
            <button onClickCapture={onConfirm}>확인 </button>
          </div>
          <div>
            <button onClickCapture={onCancel}>취소 </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  ) : null;
};

export const SelectFavoriteModal: React.FC<ModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return isOpen ? (
    <ModalContainer>
      <div className="qwe" onClick={onCancel}></div>
      <div className="modalWrap">
        <p className="text">선택한 찜목록을 삭제 하시겠습니까?</p>
        <div className="ButtonWrap">
          <div>
            <button onClickCapture={onConfirm}>확인 </button>
          </div>
          <div>
            <button onClickCapture={onCancel}>취소 </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  ) : null;
};
