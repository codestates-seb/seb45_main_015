import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import {
  FindPWData,
  LoginData,
  SignupData,
  ChangePWData,
  ChangeNickNameData,
  MyPageData,
  RegistrateItemDataField,
  ItemBidField,
  ItemBuyNowField,
} from "../type/type";
import { useAxiosRequestWithAuth } from "../Aixosinterceptor";

// 회원가입 ////////////////////////////////////////////
export const useSignup = (userData: SignupData) => {
  const req = useAxiosRequestWithAuth(); // 매번 불러오면 X
  const navigator = useNavigate();

  const signup = async () => {
    // FIXME
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
      navigator("/login");
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
  const navigator = useNavigate();

  const login = async () => {
    await req.post("/members/login", data);
  };

  const { status, mutate, isLoading, isError } = useMutation(login, {
    onSuccess(data) {
      navigator("/allList");
      console.log(`[mutation] 로그인 성공: ${data}`);
    },
    onError(error) {
      console.log(`[mutation] 로그인 실패: ${error}`);
    },
  });
  return { data, status, mutate, isLoading, isError };
};

// 로그아웃 ////////////////////////////////////////////
export const useLogout = () => {
  const req = useAxiosRequestWithAuth();
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");
  const navigator = useNavigate();
  const [removeCookie] = useCookies(["jwt"]);

  const logOutData = { token: token, member_id: parseInt(memberId as string) };

  const logout = async () => {
    const response = await req.post(`/members/logout/${memberId}`, logOutData);
  };

  const mutation = useMutation(logout, {
    onSuccess(data) {
      localStorage.removeItem("memberId");
      localStorage.removeItem("token");
      // removeCookie(["jwt"]);
      navigator("/login");
    },
    onError(error) {
      console.log(error);
    },
  });
  return mutation;
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
      navigator("/allList");
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
      const response = await req.post(
        `/members/verify-email?email=${data.email}`,
      );
      return console.log(response);
    } catch (error) {
      console.log(`find 함수 에러`);
    }
  };

  const mutation = useMutation(findPw, {
    onSuccess(data: any) {
      // FIXME
      // 응답 멤버아이디가 있으면 비빌먼호 변경페이지로 네비게이션 설정 추가
      const { member_id } = data;
      localStorage.setItem("verifyMemberID", member_id);
      console.log(`[mutation] 비번찾기 이메일 전송 성공: ${data}`);
      navigator("/change-password");
    },
    onError(error) {
      console.log(`[mutation] 비번찾기 이메일 전송 실패: ${error}`);
    },
  });
  return mutation;
};

// 변경할 비밀번호 입력 ////////////////////////////////////////
export const useChange = (data: ChangePWData) => {
  const req = useAxiosRequestWithAuth();
  const verifyMemberId = localStorage.getItem("verifyMemberId");
  const navigator = useNavigate();

  const changePw = async () => {
    const response = await req.patch(
      `/members/find-password/${verifyMemberId}`,
      data,
    );
    return response.data;
  };

  const mutation = useMutation(changePw, {
    onSuccess(data) {
      console.log(data);
      localStorage.removeItem("verifyMemberId");
      // navigator("/login");
    },
  });
  return mutation;
};

//상품리스트 불러오기 //////////////////////////////////////////////
export const getItem = async (page: number) => {
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/items?page_number=1&page_size=${page}${
        memberId ? `&watcher_id=${memberId}` : ""
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

// 상세페이지데이터 //////////////////////////////////////////////
export const fetchItemDetail = async (itemId: number, watcherId?: number) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/items/${itemId}?page_number=1&page_size=2${
        watcherId ? `&watcher_id=${watcherId}` : ""
      }`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const postItemDetailBid = async (bidData: ItemBidField) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios({
      method: "post",
      url: `http://15.164.84.204:8080/items/bids`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: bidData,
    });

    alert("입찰에 성공하였습니다.");
  } catch (error) {
    alert("입찰에 실패하였습니다.");
  }
};

export const postItemDetailBuyNow = async (buyNowData: ItemBuyNowField) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios({
      method: "post",
      url: `http://15.164.84.204:8080/items/buy-now`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: buyNowData,
    });

    alert("상품 구입에 성공하였습니다.");
  } catch (error) {
    console.error(error);
  }
};

// 상품등록 //////////////////////////////////////////////
export const useRegistrateItem = async (
  requestData: RegistrateItemDataField,
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios({
      method: "post",
      url: `http://15.164.84.204:8080/items`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: requestData,
    });

    if (response.status === 201) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    alert("데이터 전송에 실패하였습니다.");
  }
};

export const useRegistrateItemImage = async (
  itemImageFile: File[],
  itemId: number,
) => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    for (let i = 0; i < itemImageFile.length; i++) {
      formData.append("image", itemImageFile[i]);
    }
    const response = await axios({
      method: "post",
      url: `http://15.164.84.204:8080/items/${itemId}/images`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    alert("등록에 성공하였습니다.");
  } catch (error) {
    alert("이미지 업로드 실패");
    return;
  }
};

// 카테고리 불러오기 //////////////////////////////////////////////
export const getCategory = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: "http://15.164.84.204:8080/categories?page_number=1&page_size=16",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data.categories;
    return data;
  } catch (error) {
    throw error;
  }
};
// 카테고리 별 아이템 불러오기 //////////////////////////////////////////////
export const getCategoryItem = async (page: number, id: number) => {
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/items/categories?page_number=1&page_size=${page}&category_id=${id}&member_id=${memberId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data.items;
    return data;
  } catch (error) {
    throw error;
  }
};

// 찜목록 불러오기 /////////////////////////////////////////
export const getFavorite = async (size: number) => {
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/members/${memberId}/wishes?page_number=1&page_size=${size}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

// 찜목록 추가하기 /////////////////////////////////////////////////////////
export const postItem = async (itemId: number) => {
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");
  try {
    const request = await axios({
      method: "post",
      url: `http://15.164.84.204:8080/items/${itemId}/wishes/${memberId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
};

// 찜목록 삭제 /////////////////////////////////////////
export const deleteItem = async (deleteId: number[] | (() => void)) => {
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");
  try {
    const request = await axios({
      method: "delete",
      url: `http://15.164.84.204:8080/members/${memberId}/wishes`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: deleteId,
    });
    return request.data;
  } catch (error) {
    throw error;
  }
};

// 찜목록 전체 삭제 /////////////////////////////////////////
export const deleteAllFavorite = async () => {
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "delete",
      url: `http://15.164.84.204:8080/members/${memberId}/wishes`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};
// 검색 /////////////////////////////////////////
export const searchItem = async (keyWord: string, page: number) => {
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `http://15.164.84.204:8080/items/search?page_number=1&page_size=${page}&keyword=${keyWord}${
        memberId ? `&watcher_id=${memberId}` : ""
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

// FIXME
// 나의 거래목록 불러오기 ///////////////////////////////////////////
export const useMyTrade = (tradeStatus: string) => {
  const req = useAxiosRequestWithAuth();
  const memberId = localStorage.getItem("memberId");

  let converResult = "";
  const convertStatusEng = (status: string) => {
    switch (status) {
      case "경매대기중":
        converResult = "WAITING";
        break;
      case "입찰 진행중":
        converResult = "BIDDING";
        break;
      case "거래중":
        converResult = "TRADING";
        break;
      case "유찰된 물품":
        converResult = "FAILED";
        break;
      case "거래완료":
        converResult = "CLOSED";
        break;
      default:
        converResult = "";
    }
    return converResult;
  };

  // NOTE : 배포전에 이 코드로 교체
  // const tradeEndPoint = `/items/my-item?page_number=1&page_size=2&member_id=${memberId}`;

  const fetchMyTrade = async (tradeStatus: string) => {
    const tradeEndPoint =
      convertStatusEng(tradeStatus) === ""
        ? `/items/my-item?page_number=1&page_size=2&member_id=1`
        : `/items/status?page_number=1&page_size=2&item_status=${converResult}&seller_id=1`;

    console.log(`converResult 영어: ${converResult}`);
    // FIXME : 이게 한글임.
    console.log(`tradeStatus 한글: ${tradeStatus}`);

    try {
      const response = await req.get(tradeEndPoint);
      return response.data;
    } catch (error) {}
  };

  const query = useQuery(["tradeData", tradeStatus], () =>
    fetchMyTrade(tradeStatus),
  );
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
  const query = useQuery(["userData"], fetchMyPageData);

  return query;
};

// 닉네임 변경 //////////////////////////////////////
export const useChangeNickname = (inputData: ChangeNickNameData) => {
  const req = useAxiosRequestWithAuth();
  const memberId = localStorage.getItem("memberId");

  const changeNickName = async () => {
    await req.patch(`/members/change-nickname/${memberId}`, inputData);
  };

  const mutation = useMutation(changeNickName, {
    onSuccess(data) {
      console.log("닉네임 변경성공");
    },
    onError(error) {
      console.log(`닉네임 변경실패 : ${error}`);
    },
  });

  return mutation;
};

// 비밀번호 변경 //////////////////////////////////////
export const useChangePassword = (inputData: ChangePWData) => {
  const req = useAxiosRequestWithAuth();
  const memberId = localStorage.getItem("memberId");

  const changePassword = async () => {
    await req.patch(`/members/change-password/${memberId}`, inputData);
  };
  const mutation = useMutation(changePassword, {
    onSuccess(data) {
      console.log("비밀번호 변경성공");
    },
    onError(error) {
      console.log(`비밀번호 변경실패 : ${error}`);
    },
  });

  return mutation;
};
