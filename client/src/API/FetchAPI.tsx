import axios from "axios";

// 로그인 ////////////////////////////////////////////
export const useLogin = async (email: string, password: string) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://15.164.84.204:8080/members/login",
      headers: { "Content-Type": "application/json" },
      data: {
        email: email,
        password: password,
      },
    });
    if (response.status === 200) {
      console.log("로그인 성공");
      // 멤버아이디저장코드
      console.log(`서버:${response.data} `);
    }
  } catch (error) {
    console.error("로그인 실패");
  }
};

// 회원가입 ////////////////////////////////////////////
export const useSignup = async (
  email: string,
  password: string,
  nickname: string,
) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://15.164.84.204:8080/members/signup",
      headers: {
        "Content-Type": "application/json",
        // Origin: "http://localhost:3000/",
      },
      // withCredentials: true,
      data: {
        nickname: nickname,
        email: email,
        password: password,
      },
    });
    if (response.status === 200) {
      console.log("회원가입 성공");
    }
  } catch (error) {
    console.error("회원가입 실패");
  }
};

// 비밀번호 찾기 이메일 입력 ////////////////////////////////////////
export const useFind = async (email: string) => {
  try {
    const response = await axios({
      method: "get",
      url: "http://15.164.84.204:8080/members/",
      headers: { "Content-Type": "application/json" },
      data: {
        email: email,
      },
    });
    if (response.status === 200) {
      // response.data.member_id;
      // 멤버아이디를 로컬스토리에 저장? 아니면 redux store에 저장?
      console.log("비밀번호 찾기 OK");
    }
  } catch (error) {
    console.error(error);
  }
};

// 전체상품리스트 불러오기 //////////////////////////////////////////////
export const getAllItem = async (email: string) => {
  try {
    const response = await axios({
      method: "get",
      url: "http://15.164.84.204:8080/items?page_number=1&page_size=2",
      headers: { "Content-Type": "application/json" },
      data: {
        email: email,
      },
    });
    if (response.status === 200) {
      // response.data.member_id;
      // 멤버아이디를 로컬스토리에 저장? 아니면 redux store에 저장?
      console.log("비밀번호 찾기 OK");
    }
  } catch (error) {
    console.error(error);
  }
};

/*----------상세페이지데이터----------*/
export const fetchItemDetail = async (itemId: number) => {
  try {
    const response = await axios.get(
      `http://15.164.84.204:8080/items/${itemId}`,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  }
};
