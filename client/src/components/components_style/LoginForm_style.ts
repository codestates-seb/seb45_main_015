import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const LoginFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;
export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LoginFormItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;

  & > h2 {
    font-size: 2.4rem;
  }

  & > label {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }

  & > .find {
    color: #718096;
    position: absolute;
    right: 0;
    bottom: 19.5rem;
  }

  & > .find > a {
    font-size: 1.3rem;
    text-decoration: none;
    color: #777e90;
  }

  & > .sns {
    font-size: 1.1rem;
    text-align: center;

    padding: 0 2.4rem;
  }

  & > .login-btn,
  & > .signup-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 4.8rem;
    color: #ffffff;
    border: none;
    border-radius: 90px;
    background-color: ${globalTokens.Button.default.value};
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: 3rem;
    text-decoration: none;
  }

  & > .login-btn {
    margin-top: 2rem;
  }

  & > .login-btn:hover,
  & > .signup-btn:hover {
    width: 100%;
    height: 4.5rem;
    background-color: #ffffff;
    color: ${globalTokens.Button.default.value};
    border: 2px solid ${globalTokens.Button.default.value};
    cursor: pointer;
    color: ${globalTokens.Button.default.value};
  }
`;
export const LoginFormInput = styled.input`
  width: calc(100% - 1.6rem);
  height: 46px;
  margin-bottom: 3rem;
  border-radius: 6px;
  padding-left: 1.5rem;
  font-size: 1.3rem;

  border: none;
  background-color: ${globalTokens.Input.default.value};

  &::placeholder {
    font-size: 1.3rem;
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    background: #ffffff;
    outline: 2px solid ${globalTokens.Input.focused_border.value};
  }
`;
