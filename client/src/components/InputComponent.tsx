import React from "react";
import {
  InputContainer,
  InputLabel,
  ErrorMessage,
  Input,
} from "./components_style/InputComponent_style";
import { InputField } from "../type/type";

const InputComponent: React.FC<InputField> = props => {
  return (
    <InputContainer>
      <InputLabel>{props.labelText}</InputLabel>
      <ErrorMessage>{props.errorMessage}</ErrorMessage>
      <Input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setStateValue(prev => ({
            ...prev,
            [props.name]: e.target.value,
          }))
        }
        value={props.nameValue}
        disabled={props.nameValue ? true : false}
      />
    </InputContainer>
  );
};
export default InputComponent;
