import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
// import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
      >
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </GoogleOAuthProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>,
);
