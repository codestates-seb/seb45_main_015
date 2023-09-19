import { useState } from "react";
import { SignupData } from "../type/type";

const useInputValidate = (initialData: SignupData) => {
  // 데이터 유효성 검사
  const [isNickName, setIsNickName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 에러메세지
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 입력된 사용자 데이터
  const [userInfo, setUserInfo] = useState<SignupData>(initialData);

  const inputHandler = (inputData: SignupData) => {
    // const emailRegex =
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    const nicknameRegex = /^[a-zA-Z가-힣0-9]{2,}$/;

    //이메일 검사
    if (emailRegex.test(inputData.email as string)) {
      setIsEmail(true);
      setEmailMessage("");
    } else {
      setIsEmail(false);
      setEmailMessage("올바른 이메일을 입력해주세요");
    }

    // 비밀번호 검사
    if (passwordRegex.test(inputData.password as string)) {
      setIsPassword(true);
      setPasswordMessage("");
    } else {
      setIsPassword(false);
      setPasswordMessage(
        "비밀번호는 특수 문자, 소문자 및 숫자를 적어도 하나씩 포함하여 8~16자여야 합니다",
      );
    }

    // 닉네임 검사
    if (nicknameRegex.test(inputData.nickname as string)) {
      setIsNickName(true);
      setNickNameMessage("");
    } else {
      setIsNickName(false);
      setNickNameMessage(
        "사용할 수 없는 닉네임입니다. 다른 이름을 입력헤주세요",
      );
    }

    // 체크가 참이면 정보 제출
    // FIXME
    const validateData = {
      loginPage: isEmail && isPassword,
      signupPage: isNickName && isEmail && isPassword,
      findPwPage: isEmail,
      changePwPage: isPassword,
      myPageNickName: isNickName,
      myPagePassword: isPassword,
    };

    return validateData;
  };
  return {
    nickNameMessage,
    emailMessage,
    passwordMessage,
    userInfo,
    setUserInfo,
    inputHandler,
  };
};
export default useInputValidate;
