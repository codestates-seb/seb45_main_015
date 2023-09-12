import { styled } from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

export const InputLabel = styled.label`
  font-size: 15px;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  font-size: 15px;
  border-radius: 6px;
  border: none;
  background-color: ${globalTokens.Input.default.value};
  padding-left: 10px;

  & > ::placeholder {
    font-size: 15px;
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    background: #ffffff;
    outline: 2px solid ${globalTokens.Input.focused_border.value};
  }
  @media (max-width: 768px) {
    height: 44px;
    font-size: 14px;
  }
`;
