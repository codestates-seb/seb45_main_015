import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = "http://15.164.84.204:8080";
type DecodeToken = {
  auth: any;
  nickname: string;
  memberId: number;
  exp: number;
};
export const useAxiosRequestWithAuth = () => {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const navigator = useNavigate();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // axios.interceptors.request.use(
  axiosInstance.interceptors.request.use(
    config => {
      const token = cookies.jwt;

      if (token) {
        // token이 있다면 요청헤더에
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;

        // 토큰에서 멤버아이디 추출
        const decodeToken: DecodeToken = jwtDecode(token);
        const memberId = decodeToken.memberId;
        // 추출한 멤버아이디 로컬에 저장
        localStorage.setItem("memberId", memberId.toString());
        // config.needMemberId ? config.params === memberId : null;
      }
      return config;
    },
    error => {
      // 오류 요청을 보내기전 수행할 일
      console.error(error);
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => {
      if (response.data && response.data.token) {
        setCookie("jwt", response.data.token);
      }
      return response;
    },
    error => {
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        console.error("Unauthorized access. Redirecting to login.");
        navigator("/login");
      }
      // 오류 응답을 처리
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
