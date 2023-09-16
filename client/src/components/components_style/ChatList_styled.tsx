import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  width: 100%;
  padding: 20px 4px 8px 20px;
  border-bottom: solid 1px #d9dadb;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 22px;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

export const Chat = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: solid 1px #d9dadb;
  padding: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const ProfileWrapper = styled.div`
  min-width: 48px;
  min-height: 48px;
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

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 5px 0;
  margin-right: 10px;
`;

export const ChatTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  margin-right: 5px;
`;

export const ChatInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Text = styled.p`
  line-height: 1.2;
  font-size: 12px;
  margin: 0;
  color: #808080;

  &.chat-user-name {
    border-left: solid 1px #d9dadb;
    padding-left: 5px;
  }
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  height: 32px;
  font-size: 32px;
`;
