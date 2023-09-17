import axios from "axios";
import jwtDecode from "jwt-decode";
import { FindPWData, LoginData, SignupData, ChangePWData } from "../type/type";

const BASE_URL = "http://15.164.84.204:8080";

// Axios Instance
const tradeApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

// 로그인 ////////////////////////////////////////////
export const useLogin = async (data: LoginData) => {
  const response = await tradeApi.post("/members/login", data);

  if (response.status === 200) {
    const token: string = response.data.token;

    localStorage.setItem("token", `Bearer ${token}`);
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
export const getItem = async (page: number, memberID: number) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/items?page_number=1&page_size=${page}&watcher_id=${memberID}`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiIiwibmlja25hbWUiOiJybGF4b3RuMTIzIiwibWVtYmVySWQiOjE1LCJleHAiOjE2OTUwMzM0MTh9.PpHx59Mdp91uvGhQBtJA3ZiDbt2Z_8KZ8SS1jSzaBuZv9O6GJAuCtG5wpj408kI7Ug9WYYHHxnyc89cf9HR8pA`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(`데이터 불러오기를 실패했습니다.${error}`);
  }
};

// 상세페이지데이터 //////////////////////////////////////////////
export const fetchItemDetail = async (itemId: number) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/items/${itemId}`,
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiIiwibmlja25hbWUiOiJybGF4b3RuMTIzIiwibWVtYmVySWQiOjE1LCJleHAiOjE2OTUwMzM0MTh9.PpHx59Mdp91uvGhQBtJA3ZiDbt2Z_8KZ8SS1jSzaBuZv9O6GJAuCtG5wpj408kI7Ug9WYYHHxnyc89cf9HR8pA`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data.categories;
    return data;
  } catch (error) {
    console.log(`데이터 불러오기를 실패했습니다.${error}`);
  }
};
// 카테고리 별 아이템 불러오기 //////////////////////////////////////////////
export const getCategoryItem = async (page: number, id: number) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/items/categories?page_number=1&page_size=${page}&category_id=${id}&member_id=1`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiIiwibmlja25hbWUiOiJybGF4b3RuMTIzIiwibWVtYmVySWQiOjE1LCJleHAiOjE2OTUwMzM0MTh9.PpHx59Mdp91uvGhQBtJA3ZiDbt2Z_8KZ8SS1jSzaBuZv9O6GJAuCtG5wpj408kI7Ug9WYYHHxnyc89cf9HR8pA`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data.items;
    console.log(data);
    return data;
  } catch (error) {
    console.log(`데이터 불러오기를 실패했습니다.${error}`);
  }
};

// 찜목록 불러오기 /////////////////////////////////////////
export const getFavorite = async (memberId: number, length: number) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/members/${memberId}/wishes?page_number=1&page_size=${length}`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiIiwibmlja25hbWUiOiJybGF4b3RuMTIzIiwibWVtYmVySWQiOjE1LCJleHAiOjE2OTUwMzM0MTh9.PpHx59Mdp91uvGhQBtJA3ZiDbt2Z_8KZ8SS1jSzaBuZv9O6GJAuCtG5wpj408kI7Ug9WYYHHxnyc89cf9HR8pA`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(`데이터 불러오기를 실패했습니다.${error}`);
  }
};

// 찜목록 추가하기 /////////////////////////////////////////////////////////
export const postItem = async (itemId: number, memberId: number) => {
  try {
    const request = await axios({
      method: "post",
      url: `http://15.164.84.204:8080/items/${itemId}/wishes/${memberId}`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiIiwibmlja25hbWUiOiJybGF4b3RuMTIzIiwibWVtYmVySWQiOjE1LCJleHAiOjE2OTUwMzM0MTh9.PpHx59Mdp91uvGhQBtJA3ZiDbt2Z_8KZ8SS1jSzaBuZv9O6GJAuCtG5wpj408kI7Ug9WYYHHxnyc89cf9HR8pA`,
        "Content-Type": "application/json",
      },
    });
    console.log("찜목록 추가완료");
  } catch (error) {
    console.log(`찜목록 추가를 실패했습니다.${error}`);
  }
};

// 찜목록 삭제 /////////////////////////////////////////
export const deleteItem = async (
  memberId: number,
  deleteId: number[] | (() => void),
) => {
  try {
    const request = await axios({
      method: "delete",
      url: `http://15.164.84.204:8080/members/${memberId}/wishes`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiIiwibmlja25hbWUiOiJybGF4b3RuMTIzIiwibWVtYmVySWQiOjE1LCJleHAiOjE2OTUwMzM0MTh9.PpHx59Mdp91uvGhQBtJA3ZiDbt2Z_8KZ8SS1jSzaBuZv9O6GJAuCtG5wpj408kI7Ug9WYYHHxnyc89cf9HR8pA`,
        "Content-Type": "application/json",
      },
      data: deleteId,
    });
    return request.data;
  } catch (error) {
    console.log(`데이터 삭제를 실패했습니다.${error}`);
  }
};

// 찜목록 전체 삭제 /////////////////////////////////////////
interface objTest {
  bid_unit: number;
  buy_now_price: number;
  buyer_id: null;
  buyer_nickname: null;
  category: string;
  content: string;
  current_price: number;
  end_time: string;
  item_id: number;
  item_image_urls: string[];
  seller_id: number;
  seller_nickname: string;
  start_price: number;
  status: string;
  title: string;
  wish_id: number;
}
export const deleteAllFavorite = async (memberId: number, length: number) => {
  try {
    const response = await axios({
      method: "delete",
      url: `http://15.164.84.204:8080/members/${memberId}/wishes?page_number=1&page_size=${length}`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiIiwibmlja25hbWUiOiJybGF4b3RuMTIzIiwibWVtYmVySWQiOjE1LCJleHAiOjE2OTUwMzM0MTh9.PpHx59Mdp91uvGhQBtJA3ZiDbt2Z_8KZ8SS1jSzaBuZv9O6GJAuCtG5wpj408kI7Ug9WYYHHxnyc89cf9HR8pA`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(`데이터 불러오기를 실패했습니다.${error}`);
  }
};
// 검색 /////////////////////////////////////////
export const searchItem = async (keyWord: string, memberId?: number) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/items/search?page_number=1&page_size=18&keyword=${keyWord}${
        memberId ? `&watcher_id=${memberId}` : ""
      }`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiIiwibmlja25hbWUiOiJybGF4b3RuMTIzIiwibWVtYmVySWQiOjE1LCJleHAiOjE2OTUwMzM0MTh9.PpHx59Mdp91uvGhQBtJA3ZiDbt2Z_8KZ8SS1jSzaBuZv9O6GJAuCtG5wpj408kI7Ug9WYYHHxnyc89cf9HR8pA`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(`데이터 불러오기를 실패했습니다.${error}`);
  }
};
