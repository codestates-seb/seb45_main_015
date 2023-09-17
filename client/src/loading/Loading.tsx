import React from "react";
import { PulseLoader } from "react-spinners";
import { styled } from "styled-components";

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <PulseLoader color="#0064ff" size={40} margin={15} />
    </LoadingContainer>
  );
};
export default Loading;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
