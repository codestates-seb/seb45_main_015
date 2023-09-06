import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const ToastContainer = styled.div<{ slide: string }>`
  width: 330px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${globalTokens.Toast_green.value};
  gap: 10px;
  color: #ffffff;
  position: fixed;
  top: 90px;
  right: ${props => (props.slide === "true" ? "-330px" : "0px")};
  animation: ${props =>
      props.slide === "true" ? "slideout 1s" : "slidein 1.5s"}
    linear;
  z-index: 1000;

  @keyframes slidein {
    0% {
      right: -330px;
    }

    100% {
      right: 0px;
    }
  }
  @keyframes slideout {
    0% {
      right: 0px;
    }

    100% {
      right: -330px;
    }
  }

  & > .toast {
    font-size: 14px;
    margin-left: 10px;
  }

  & > .toast-title {
    font-weight: 700;
  }

  & > .toast-description {
    font-weight: 300;
  }
`;
