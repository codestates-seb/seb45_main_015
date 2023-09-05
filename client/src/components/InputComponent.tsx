import React from "react";
import {
  InputContainer,
  InputLabel,
  Input,
} from "./components_style/InputComponent_style";

const InputComponent: React.FC = () => {
  return (
    <InputContainer>
      <InputLabel>입력창 라벨</InputLabel>
      <Input placeholder="자리표시자" />
    </InputContainer>
  );
};
export default InputComponent;
