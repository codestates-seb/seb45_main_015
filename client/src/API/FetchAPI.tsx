import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  FindPWData,
  LoginData,
  SignupData,
  ChangePWData,
  MyPageData,
} from "../type/type";
import { useAxiosRequestWithAuth } from "../Aixosinterceptor";
import { useNavigate } from "react-router-dom";

// 회원가입 ////////////////////////////////////////////
export const useSignup = (userData: SignupData) => {
  const req = useAxiosRequestWithAuth();

  const signup = async () => {
    try {
      const response = await req.post("/members/signup", userData);
      if (!response.data) {
        console.log("Failed fetch");
        return console.log(response);
      }
    } catch (error) {
      console.log(`sign 함수 에러`);
    }
  };

  const mutation = useMutation(signup, {
    onSuccess(data) {
      console.log(`useMutation 성공: ${data}`);
    },
    onError(error) {
      console.log(`useMutation 실패: ${error}`);
    },
  });
  return mutation;
};

// 로그인 ////////////////////////////////////////////
export const useLogin = (data: LoginData) => {
  const req = useAxiosRequestWithAuth();

  const login = async () => {
    try {
      const response = await req.post("/members/login", data);
      return console.log(response);
    } catch (error) {
      console.log(`로그인 함수 에러: ${error}`);
    }
  };

  const { status, mutate, isSuccess, isError } = useMutation(login, {
    onSuccess(data) {
      console.log(`[mutation] 로그인 성공: ${data}`);
    },
    onError(error) {
      console.log(`[mutation] 로그인 실패: ${error}`);
    },
  });
  return { data, status, mutate, isSuccess, isError };
};

// 로그아웃 ////////////////////////////////////////////
export const useLogout = async () => {
  const req = useAxiosRequestWithAuth();

  const memberId = localStorage.getItem("memberId");

  try {
    const response = await req.get(`/members/logout/${memberId}`, {
      params: memberId,
    });
    if (response.status === 200) {
      localStorage.removeItem("memberId");
    }
    return response.status;
  } catch (error) {
    console.error(error);
  }
  return req;
};

// 게스트 로그인
export const useGuestLogin = () => {
  const req = useAxiosRequestWithAuth();
  const navigator = useNavigate();

  const guestLogin = async () => {
    try {
      const response = await req.post("/members/guest-login");
      return console.log(response);
    } catch (error) {
      console.log(`게스트로그인 함수 에러`);
    }
  };

  const mutation = useMutation(guestLogin, {
    onSuccess(data) {
      console.log(`[mutation] 게스트 로그인 성공: ${data}`);
    },
    onError(error) {
      console.log(`[mutation] 게스트 로그인 실패: ${error}`);
    },
  });
  return mutation;
};

// FIXME : 비밀번호 찾기 이메일 입력 ////////////////////////////////////////
export const useFind = (data: FindPWData) => {
  const req = useAxiosRequestWithAuth();
  const navigator = useNavigate();

  const findPw = async () => {
    try {
      const response = await req.post("/members", data);
      return console.log(response.status);
    } catch (error) {
      console.log(`find 함수 에러`);
    }
  };

  const mutation = useMutation(findPw, {
    onSuccess(data) {
      console.log(`[mutation] 비번찾기 이메일 전송 성공: ${data}`);
    },
    onError(error) {
      console.log(`[mutation] 비번찾기 이메일 전송 실패: ${error}`);
    },
  });
  return mutation;
};

// 변경할 비밀번호 입력 ////////////////////////////////////////
export const useChange = async (data: ChangePWData) => {
  const req = useAxiosRequestWithAuth();
  const memberId = 1;
  try {
    const response = await req.post(`/members/find-password/${memberId}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
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
    });
    const data = response.data.categories;
    return data;
  } catch (error) {
    // alert(`데이터 불러오기를 실패했습니다.${error}`);
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

// FIXME
// 나의 거래목록 불러오기 ///////////////////////////////////////////
export const useMyTrade = () => {
  const req = useAxiosRequestWithAuth();
  const memberId = localStorage.getItem("memberId");
  const status_code = "상태코드";

  const tradeEndPoint = `/items/my-item?page_number=1&page_size=2&member_id=${memberId}`;

  const fetchMyTrade = async () => {
    try {
      const response = await req.get(
        `/items/status?page_number=1&page_size=2&item_status=${status_code}&seller_id=1`,
      );
      return response.data;
    } catch (error) {}
  };

  const query = useQuery(["tradeData"], fetchMyTrade);
  return query;
};

// MyPageData에 멤버아이디추가
// 마이페이지 정보 불러오기 ///////////////////////////////////
export const usefetchMyPage = () => {
  const req = useAxiosRequestWithAuth();
  const memberId = localStorage.getItem("memberId");

  const fetchMyPageData = async () => {
    try {
      const response = await req.get(`/members/${memberId}`, {
        params: {
          memberId: memberId,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const query = useQuery(["userData"], fetchMyPageData, {
    keepPreviousData: true,
  });

  return query;
};

// 닉네임 변경 //////////////////////////////////////
export const useChangeNickname = (inputData: MyPageData) => {
  const req = useAxiosRequestWithAuth();
  const memberId = localStorage.getItem("memberId");

  const changeNickName = async () => {
    try {
      const response = await req.patch(
        `/members/change-nickname/${memberId}`,
        inputData,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const response = useMutation(changeNickName);

  return response;
};

// 비밀번호 변경 //////////////////////////////////////
export const useChangePassword = (inputData: MyPageData) => {
  const req = useAxiosRequestWithAuth();
  const memberId = localStorage.getItem("memberId");

  const changePassword = async () => {
    try {
      const response = await req.patch(
        `/members/change-password/${memberId}`,
        inputData,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const response = useMutation(changePassword);

  return response;
};
