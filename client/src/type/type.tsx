import { Dispatch, SetStateAction } from "react";

export type SignupData = {
  email?: string;
  password?: string;
  nickname?: string;
  newPassword?: string;
  confirmPassword?: string;
};

// 마이페이지 데이터
export type MyPageData = Omit<SignupData, "email">;

// 로그인 데이터
export type LoginData = Omit<SignupData, "nickname">;

// 비밀번호 변경 - 인증메일
export type FindPWData = Pick<SignupData, "email">;

export type ChangeNickNameData = Pick<SignupData, "nickname">;

// 비밀번호 변경데이터 - 비밀번호입력
export type ChangePWData = Pick<SignupData, "newPassword" | "confirmPassword">;

export interface InputField {
  type: string;
  name: string;
  labelText: string;
  placeholder: string;
  nameValue?: string;
  stateValue?: SignupData | LoginData | FindPWData | ChangePWData | string;
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

export interface SpecificationField {
  title: string;
  value: string | number;
  unit?: string;
}

export type MyTradeType = {
  items: {
    seller_id: number;
    seller_nickname: string;
    buyer_id: null;
    buyer_nickname: null;
    item_id: number;
    status: string;
    title: string;
    content: string;
    end_time: string;
    category: string;
    item_image_urls: [];
    start_price: number;
    bid_unit: number;
    current_price: number;
    buy_now_price: number;
    in_wish_list: boolean;
  };
};

export type PageData = {
  page_info: {
    page_number: number;
    page_size: number;
    total_elements: number;
    total_pages: number;
  };
};
