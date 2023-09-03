import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const DropDown = styled.div`
  position: absolute;
  overflow: visible;
  margin-top: 5px;
  margin-left: -212px;
`;

export const Decoration = styled.div`
  position: absolute;
  background-color: #fff;
  margin-left: 210px;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  rotate: -45deg;
`;

export const Container = styled.div`
  position: absolute;
  background-color: #fff;
  width: 256px;
  border-radius: 12px;
  margin-top: 12px;
  box-shadow: 0px 16px 64px rgba(31, 47, 70, 0.4);
  padding: 32px 16px 16px 16px;
`;

export const UserName = styled.h2`
  display: flex;
  font-size: 24px;
  margin: 0;
  margin-bottom: 8px;
  font-weight: bold;
  color: #23262f;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  color: #23262f;

  &:not(:first-of-type) {
    border-top: solid 1px #e6e8ec;
  }
`;

export const Icon = styled.div`
  font-size: 18px;
  color: #777e90;
  margin-right: 10px;
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-weight: bold;
  color: #777e90;
`;
