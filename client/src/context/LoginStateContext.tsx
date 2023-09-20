import { Dispatch, SetStateAction, createContext } from "react";

type LoginStateContextType = {
  isLogin?: boolean;
  setIsLogin?: Dispatch<SetStateAction<boolean>>;
};

export const LoginStateContext = createContext<LoginStateContextType>({});
