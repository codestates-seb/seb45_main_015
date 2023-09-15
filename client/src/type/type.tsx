import { Dispatch, SetStateAction } from "react";

export type SignupData = {
  email: string;
  password: string;
  nickname: string;
};

// 로그인 데이터
export type LoginData = Omit<SignupData, "nickname">;

// 비밀번호 변경 - 인증메일
export type FindPWData = Pick<SignupData, "email">;

// 비밀번호 변경데이터 - 비밀번호입력
export type ChangePWData = Pick<SignupData, "password">;

export interface InputField {
  type: string;
  name: string;
  labelText: string;
  placeholder: string;
  stateValue?: SignupData | LoginData | FindPWData | ChangePWData;
  errorMessage?: string;
  setStateValue: Dispatch<
    SetStateAction<SignupData | LoginData | FindPWData | ChangePWData>
  >;
}

// 아이템 등록
export interface RegistrateField {
  subTitle: string;
  placeholder?: string;
  description: string;
  inputType?: string;
  button?: RegistrateButtonField[];
  maxLength?: number;
}

export interface RegistrateButtonField {
  value: number;
  btn: string;
}

export interface CategoryField {
  id: number;
  name: string;
}

export interface RegistrateItemDataField {
  seller_id: string;
  title: string;
  content: string;
  auction_time: number;
  category_id: number;
  start_price: number;
  bid_unit: number;
  buy_now_price?: number;
}
