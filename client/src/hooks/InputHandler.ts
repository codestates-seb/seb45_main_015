import { useState } from "react";

// 로그인, 회원가입 정보 입력
export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleInputChange,
  };
};
