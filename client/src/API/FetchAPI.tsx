import axios from "axios";
import { FindPWData, LoginData, SignupData, ChangePWData } from "../type/type";

const BASE_URL = "http://15.164.84.204:8080";

// Axios Instance
const tradeApi = axios.create({
  baseURL: BASE_URL,
  // timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});


// 로그인 ////////////////////////////////////////////
export const useLogin = async (data: LoginData) => {
  const response = await tradeApi.post("/members/login", data);
  if (response.status === 200) {
    localStorage.setItem("memberID", response.data);
    localStorage.setItem("token", `Bearer ${response.data.token}`);
  } else {
    console.log("로그인 실패");
  }
};

// 회원가입 ////////////////////////////////////////////
export const useSignup = async (data: SignupData) => {
  const response = await tradeApi.post("/members/signup", data);
  if (response.status === 200) {
    console.log("회원가입 성공");
  } else {
    console.error("회원가입 실패");
  }
};

// FIXME : 비밀번호 찾기 이메일 입력 ////////////////////////////////////////
export const useFind = async (data: FindPWData) => {
  const response = await tradeApi.get("/members");
  return response.data;
};

// 변경할 비밀번호 입력 ////////////////////////////////////////
export const useChange = async (data: ChangePWData) => {
  const memberId = localStorage.getItem("memberID");
  const response = await tradeApi.post(
    `/members/find-password/${memberId}`,
    data,
  );

  return response.data;
};

// 상품리스트 불러오기 //////////////////////////////////////////////
export const getItem = async (Url: string) => {
  try {
    const response = await axios({
      method: "get",
      url: Url,
    });
    const data = response.data;
    return data;
  } catch (error) {
    alert(`데이터 불러오기를 실패했습니다.${error}`);
  }
};


// 상세페이지데이터 //////////////////////////////////////////////
export const fetchItemDetail = async (itemId: number) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/items/${itemId}`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// 상품등록 //////////////////////////////////////////////
export const postRegistrateItem = async (
  seller_id: string,
  title: string,
  content: string,
  auction_time: number,
  category_id: number,
  start_price: number,
  bid_unit: number,
  buy_now_price: number,
) => {
  try {
    const response = await axios({
      method: "post",
      url: `http://15.164.84.204:8080/items`,
      headers: { "Content-Type": "application/json" },
      data: {
        seller_id,
        title,
        content,
        auction_time,
        category_id,
        start_price,
        bid_unit,
        buy_now_price,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// 카테고리 불러오기 //////////////////////////////////////////////
export const getCategory = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "http://15.164.84.204:8080/categories?page_number=1&page_size=16",
    });
    const data = response.data.categories;
    return data;
  } catch (error) {
    alert(`데이터 불러오기를 실패했습니다.${error}`);
  }
};

// 찜목록 추가하기 /////////////////////////////////////////////////////////
export const postItem = async (itemId: number, memberId: number) => {
  try {
    const request = await axios({
      method: "post",
      url: `http://15.164.84.204:8080/items/${itemId}/favorites/${memberId}`,
    });
  } catch (error) {
    alert(`데이터 불러오기를 실패했습니다.${error}`);
  }
};

