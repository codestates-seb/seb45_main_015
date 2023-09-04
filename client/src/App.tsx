import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toast from "./alret/Toast";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import FindPasswordPage from "./page/FindPasswordPage";
import ChangePasswordPage from "./page/ChangePasswordPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
<<<<<<< HEAD
<<<<<<< HEAD
import MyTrade from "./page/MyTrade";
=======
import Trade from "./components/TradeNav";
import ItemListPage from "./page/ItemListPage";
import FavoritePage from "./page/FavoritePage";
>>>>>>> 4665219 (버튼컴포넌트 완성, 전체리스트반응형 작업중)
=======
import ItemListPage from "./page/ItemListPage";
import FavoritePage from "./page/FavoritePage";
import MyTrade from "./page/MyTrade";
>>>>>>> 0977051 ([FE] docs: 비밀번호 변경페이지 라우터 추가)

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Toast />
        <div className="Main">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/find-password" element={<FindPasswordPage />} />
<<<<<<< HEAD
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/mytrade" element={<MyTrade />} />
<<<<<<< HEAD
=======
            <Route path="/itemListPage" element={<ItemListPage />} />
            <Route path="/favoritePage" element={<FavoritePage />} />
<<<<<<< HEAD
>>>>>>> 4665219 (버튼컴포넌트 완성, 전체리스트반응형 작업중)
=======
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/mytrade" element={<MyTrade />} />
>>>>>>> 0977051 ([FE] docs: 비밀번호 변경페이지 라우터 추가)
=======
            <Route path="/itemListPage" element={<ItemListPage />} />
>>>>>>> 5c8f95e (itemListPage 작업중)
          </Routes>
          <MyTrade />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
