import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

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

type DecodeToken = {
  auth: any;
  nickname: string;
  memberId: number;
  exp: number;
};

// 회원가입 ////////////////////////////////////////////
export const useSignup = (userData: SignupData) => {
  const req = useAxiosRequestWithAuth(); // 매번 불러오면 X
  const navigator = useNavigate();

  const signup = async () => {
    // FIXME
    try {
      const response = await req.post("/members/signup", userData);
      if (!response.data) {
        return response.data;
      }
    } catch (error) {}
  };

  const mutation = useMutation(signup, {
    onSuccess(data) {
      navigator("/login");
    },
    onError(error) {
      return;
    },
  });
  return mutation;
};

// 로그인 ////////////////////////////////////////////
export const useLogin = (data: LoginData) => {
  const navigator = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt"]);

  const handleLoginSuccess = (token: string) => {
    // 토큰 저장 (보안 고려 필요)
    setCookie("jwt", token);
    // 토큰에서 멤버아이디 추출
    const decodeToken: DecodeToken = jwtDecode(cookies.jwt);
    const memberId = decodeToken.memberId;
    const memberName = decodeToken.nickname;
    // 추출한 멤버아이디 로컬에 저장
    localStorage.setItem("memberName", memberName);
    localStorage.setItem("memberId", memberId.toString());
    localStorage.setItem("token", token);

    // 페이지 리다이렉션
    navigator("/allList");
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://15.164.84.204:8080/members/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const { token } = response.data;
      // 로그인 성공 시 처리
      handleLoginSuccess(token);
    } catch (error) {
      // 에러 처리
      // handleLoginError(error);
    }
  };

  return login;
};

// 로그아웃 ////////////////////////////////////////////
export const useLogout = () => {
  const req = useAxiosRequestWithAuth();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("token");

  const navigator = useNavigate();

  const logOutData = { token: token, member_id: parseInt(memberId as string) };

  const logout = async () => {
    const response = await req.post(`/members/logout/${memberId}`, logOutData);
  };

  const mutation = useMutation(logout, {
    onSuccess(data) {
      localStorage.removeItem("memberId");
      localStorage.removeItem("token");
      localStorage.removeItem("memberName");
      removeCookie("jwt");
      navigator("/login");
    },
    onError(error) {
      return;
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
    } catch (error) {
      return;
    }
  };

  const mutation = useMutation(guestLogin, {
    onSuccess(data) {
      localStorage.setItem("memberName", "게스트");

      navigator("/allList");
    },
    onError(error) {
      return;
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
    } catch (error) {
      return;
    }
  };

  const mutation = useMutation(findPw, {
    onSuccess(data: any) {
      // FIXME
      // 응답 멤버아이디가 있으면 비빌먼호 변경페이지로 네비게이션 설정 추가
      const { member_id } = data;
      localStorage.setItem("verifyMemberID", member_id);

      navigator("/change-password");
    },
    onError(error) {
      return;
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
      localStorage.removeItem("verifyMemberId");
      navigator("/login");
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
      // console.log(response.data);
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

  let statusAPI = "";
  const convertStatusEng = (status: string) => {
    switch (status) {
      case "내가 등록한 물건":
        statusAPI = `/items/my-item/sells?page_number=1&page_size=2&seller_id=${memberId}`;
        break;
      case "입찰 진행중":
        statusAPI = `/items/my-item/bids?page_number=1&page_size=2&buyer_id=${memberId}`;
        break;
      // FIXME
      case "거래중":
        statusAPI = `/items/my-item/trade?page_number=1&page_size=2&item_status=TRADING&member_id=${memberId}`;
        break;
      case "거래완료":
        statusAPI = `/items/my-item/trade?page_number=1&page_size=2&item_status=CLOSED&member_id=${memberId}`;
        break;
      case "유찰된 물품":
        statusAPI = `/items/my-item/status?page_number=1&page_size=2&item_status=FAILED&seller_id=${memberId}`;
        break;
      default:
        statusAPI = "";
    }
    return statusAPI;
  };

  const fetchMyTrade = async (tradeStatus: string) => {
    const tradeEndPoint =
      convertStatusEng(tradeStatus) === ""
        ? `/items/my-item/home?page_number=1&page_size=2&member_id=${memberId}`
        : statusAPI;
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
      // console.log("닉네임 변경성공");
    },
    onError(error) {
      // console.log(`닉네임 변경실패 : ${error}`);
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
      // console.log("비밀번호 변경성공");
    },
    onError(error) {
      // console.log(`비밀번호 변경실패 : ${error}`);
    },
  });

  return mutation;
};
