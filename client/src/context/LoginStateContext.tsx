import { MutableRefObject, createContext } from "react";

type LoginStateContextType = {
  currentLogin: MutableRefObject<boolean>;
};

export const LoginStateContext = createContext<LoginStateContextType>({
  currentLogin: { current: false },
});
