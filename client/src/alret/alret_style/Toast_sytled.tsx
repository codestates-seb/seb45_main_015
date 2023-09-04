import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

export const ToastContainer = styled.div<{ slide: boolean }>`
  width: 33rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${globalTokens.Toast_green.value};
  gap: 1rem;
  border-radius: 6px;
  color: #ffffff;
  position: fixed;
  top: 3rem;
  right: -33rem;
  /* right: 0rem; */
  animation: ${props => (props.slide ? "slideout 1s" : "slidein 1.5s")} linear;
  z-index: 1000;

  @keyframes slidein {
    0% {
      right: -33rem;
    }

    100% {
      right: 0rem;
    }
  }
  @keyframes slideout {
    0% {
      right: 0rem;
    }

    100% {
      right: -33rem;
    }
  }

  & > .toast {
    font-size: 1.4rem;
    margin-left: 1rem;
  }

  & > .toast-title {
    font-weight: 700;
  }

  & > .toast-description {
    font-weight: 300;
  }
`;
