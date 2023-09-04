import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toast from "./alret/Toast.";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import FindPasswordPage from "./page/FindPasswordPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <header></header>
        <Toast />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/find-password" element={<FindPasswordPage />} />
        </Routes>
        <footer></footer>
      </BrowserRouter>
    </div>
  );
};

export default App;
