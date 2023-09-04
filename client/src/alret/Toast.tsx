import React, { useState } from "react";
import { ToastContainer } from "./alret_style/Toast_sytled";

const Toast: React.FC = () => {
  const [slide, setSilde] = useState(false);
  return (
    <>
      <ToastContainer slide={slide} onClick={prev => setSilde(!prev)}>
        <span className="toast toast-title">알림종류</span>
        <span className="toast toast-description">
          등록하신 물건의 유예기간이 종료되었습니다
        </span>
      </ToastContainer>
    </>
  );
};

export default Toast;
