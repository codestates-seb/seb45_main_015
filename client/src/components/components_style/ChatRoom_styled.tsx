import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 8px 15px 8px;
  border-bottom: solid 1px #d9dadb;
`;

export const Icon = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 32px;
  margin-right: 5px;
`;

export const ProfileWrapper = styled.div`
  min-width: 40px;
  min-height: 40px;
  border-radius: 90px;
  background-color: #fff;
  overflow: hidden;
  border: solid 1px #d9dadb;
  margin-right: 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-line;
`;

export const InfoInner = styled.div`
  display: flex;
  align-items: center;
`;

export const ChatTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  margin-right: 5px;
`;

export const Text = styled.p`
  font-size: 12px;
  margin: 0;
  color: #808080;
  white-space: pre-wrap;

  &.chat-user-name {
    border-left: solid 1px #d9dadb;
    padding-left: 5px;
  }

  &.another-user-message {
    color: #2a2a2a;
    font-size: 14px;
  }

  &.user-message {
    color: #fff;
    font-size: 14px;
  }

  &.message-time {
    font-size: 10px;
  }

  &.message-date {
    white-space: nowrap;
    margin: 0 10px;
  }
`;

export const Main = styled.div`
  height: 100%;
  padding: 10px 10px 0 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #808080;
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  &.another-user-message {
    align-items: start;
  }

  &.user-message {
    align-items: end;
  }
`;

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;

  &.another-user-message {
    background-color: #e7f3ff;
    border-radius: 12px 12px 12px 0;
  }

  &.user-message {
    background-color: #55ccff;
    border-radius: 12px 12px 0 12px;
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 20px;
`;

export const DateLine = styled.div`
  border-bottom: solid 1px #d9dadb;
  width: 100%;
  height: 50%;
`;

export const Chatting = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
`;

export const ChattingArea = styled.textarea`
  resize: none;
  background-color: #edf2f7;
  height: 32px;
  width: 100%;
  font-size: 16px;
  border-style: none;
  border-radius: 6px;
  padding: 5px 0 5px 5px;
  margin-right: 10px;

  &:focus-within {
    outline: 2px solid #0064ff;
    height: 64px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #808080;
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const SendButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  width: 60px;
  background-color: #0064ff;
  border-style: none;
  border-radius: 6px;
`;
