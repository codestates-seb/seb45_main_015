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
      headers: { "Content-Type": "application/json" },
    });
    const data = response.data;
    return data;
  } catch (error) {
    alert(`데이터 불러오기를 실패했습니다.${error}`);
  }
};

//
//
// 로그인 ////////////////////////////////////////////
// export const useLogin = async (data: LoginData) => {
//   try {
//     const response = await axios({
//       method: "post",
//       url: "http://15.164.84.204:8080/members/login",
//       headers: { "Content-Type": "application/json" },
//       data: {
//         email: data.email,
//         password: data.password,
//       },
//     });
//     if (response.status === 200) {
//       console.log("로그인 성공");
//       // 멤버아이디저장코드
//       console.log(`서버:${response.data} `);
//     }
//   } catch (error) {
//     console.error("로그인 실패");
//   }
// };

// 회원가입 ////////////////////////////////////////////
// export const useSignup = async (data: SignupData) => {
//   try {
//     const response = await axios({
//       method: "post",
//       url: "http://15.164.84.204:8080/members/signup",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: {
//         nickname: data.nickname,
//         email: data.email,
//         password: data.password,
//       },
//     });
//     if (response.status === 200) {
//       console.log("회원가입 성공");
//     }
//   } catch (error) {
//     console.error("회원가입 실패");
//   }
// };

// 비밀번호 찾기 이메일 입력 ////////////////////////////////////////
// export const useFind = async (data: FindPWData) => {
//   try {
//     const response = await axios({
//       method: "get",
//       url: "http://15.164.84.204:8080/members/",
//       headers: { "Content-Type": "application/json" },
//       data: {
//         email: data.email,
//       },
//     });
//     if (response.status === 200) {
//       // response.data.member_id;
//       // 멤버아이디를 로컬스토리에 저장? 아니면 redux store에 저장?
//       console.log("비밀번호 찾기 OK");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
