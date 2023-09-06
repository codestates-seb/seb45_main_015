import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const SignupFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;

  & > .already-have-account {
    font-size: 1.2rem;
    margin-top: 3rem;
  }

  & > .already-have-account > a {
    margin-left: 5px;
    font-size: 1.4rem;
    text-decoration: none;
    color: ${globalTokens.Button.default.value};
  }
`;

export const SignupFormContainer = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const SignupFormItem = styled.div`
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

  & > .password-convention {
    font-size: 1.1rem;
    color: #718096;
    position: absolute;
    left: 0;
    bottom: 11rem;
  }

  & > .sns {
    font-size: 1.1rem;
    text-align: center;
    padding: 0 24px;
  }

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
    margin-bottom: 30px;
    margin-top: 20px;
    text-decoration: none;
  }
  & > .signup-btn:hover {
    width: 100%;
    height: 4.5rem;
    background-color: #ffffff;
    color: ${globalTokens.Button.default.value};
    border: 2px solid ${globalTokens.Button.default.value};
    cursor: pointer;
  }
`;
export const SignupFormInput = styled.input`
  width: calc(100% - 1.6rem);
  height: 46px;
  margin-bottom: 3rem;
  border-radius: 6px;
  font-size: 1.3rem;
  padding-left: 1.5rem;
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
