import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1004;
  background-color: #00000025;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  width: 300px;
  min-height: 200px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const TextWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 20px;
`;

export const Text = styled.p`
  margin: 0;
  white-space: normal;
  font-weight: bold;
  line-height: 30px;
`;

export const StarWrapper = styled.div`
  width: 100%;
  height: auto;
`;

export const StarButton = styled.button`
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border-style: none;
  margin-right: 5px;
  color: #ffd84f;
  font-size: 36px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: #0064ff;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  height: 40px;
  border-radius: 45px;
  border-style: none;

  &.modal-cancel {
    margin-left: 11px;
    border: solid 2px #0064ff;
    background-color: #fff;
    color: #0064ff;
  }
`;

// 찜목록 모달-------------------
export const ModalContainer = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: Default;
  & .modalWrap {
    width: 400px;
    height: 200px;
    background: white;
    position: absolute;
    z-index: 4;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .ButtonWrap {
    width: 60%;
    height: 100px;
    z-index: 4;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  & .ButtonWrap > div {
    width: 40%;
    height: 60%;
  }
  & button {
    cursor: pointer;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    color: ${globalTokens.Button.default.value};
    background: white;
    border: 2px solid ${globalTokens.Button.default.value};
    &:hover {
      color: white;
      background: ${globalTokens.Button.default.value};
    }
  }
  & .text {
    z-index: 4;
    color: black;
    font-size: 20px;
    margin: 10% 0;
  }
  & .qwe {
    width: 100%;
    height: 100%;
    z-index: 3;
    background: rgba(0, 0, 0, 0.5);
  }
`;
