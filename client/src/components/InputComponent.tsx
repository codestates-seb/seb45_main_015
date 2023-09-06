import React from "react";
import {
  InputContainer,
  InputLabel,
  Input,
} from "./components_style/InputComponent_style";
import { InputData, InputProps } from "../type/type";
import { useInput } from "../hooks/InputHandler";

// FIXME :useParams를 이용, 페이지마다 input이 다르게

const data: InputData = {
  email: "",
  password: "",
  nickname: "",
};

const InputComponent: React.FC<InputProps> = ({
  labelText,
  type,
  name,
  placeholder,
}) => {
  const emailInput = useInput(data.email);
  const passwordInput = useInput(data.password);
  const nicknameInput = useInput(data.nickname);

  return (
    <InputContainer>
      <InputLabel>{labelText}</InputLabel>
      <Input
        type={type}
        name={name ? name : type}
        placeholder={placeholder}
        value={type === "email" ? emailInput.value : passwordInput.value}
        onChange={
          type === "email" ? emailInput.onChange : passwordInput.onChange
        }
      />
    </InputContainer>
  );
};
export default InputComponent;
