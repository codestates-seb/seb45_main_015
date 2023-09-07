import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 999;
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
    border: solid 1px #bcbfc2;
    background-color: #fff;
    color: #000;
  }
`;
