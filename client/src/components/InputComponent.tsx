import React from "react";
import {
  InputContainer,
  InputLabel,
  Input,
} from "./components_style/InputComponent_style";
import { InputField } from "../type/type";

const InputComponent: React.FC<InputField> = props => {
  return (
    <InputContainer>
      <InputLabel>{props.labelText}</InputLabel>
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
      />
    </InputContainer>
  );
};
export default InputComponent;
