import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";

type VerifyStatus = {
  verifyStatus: {
    verifiedRequest: boolean;
    setVerifiedRequest: Dispatch<SetStateAction<boolean>>;
  };
};
const VerifyTimer = ({ verifyStatus }: VerifyStatus) => {
  const { verifiedRequest, setVerifiedRequest } = verifyStatus;
  const initialTime = 120; // 2분을 초 단위로 표현
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (verifiedRequest && time > 0) {
      // isActive를 체크하여 타이머가 활성화 중일 때만 작동
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      // 컴포넌트가 언마운트되면 interval을 정리
      return () => {
        clearInterval(interval);
      };
    } else if (time === 0) {
      // 시간이 종료되면 타이머를 중지
      setVerifiedRequest(prev => !prev);
      return void 0;
    }
    return void 0;
  }, [time, verifiedRequest]);

  // 분과 초 계산
  const minutesDisplay = Math.floor(time / 60);
  const secondsDisplay = time % 60;

  return (
    <Timer>
      <span>{minutesDisplay.toString().padStart(2, "0")}:</span>
      <span>{secondsDisplay.toString().padStart(2, "0")}</span>
    </Timer>
  );
};

export default VerifyTimer;

const Timer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 44px;
  border-radius: 6px;
  background-color: #fa254f;

  & > span {
    color: #ffffff;
    font-size: 25px;
  }
`;
