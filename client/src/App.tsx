import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toast from "./alret/Toast";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import FindPasswordPage from "./page/FindPasswordPage";
import ChangePasswordPage from "./page/ChangePasswordPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegistrateItemPage from "./page/RegistrateItemPage";
import ItemDetailPage from "./page/ItemDetailPage";
import MyTrade from "./page/MyTrade";
import ItemListPage from "./page/ItemListPage";
import MyPage from "./page/MyPage";
import ItemCategoryPage from "./page/ItemCategoryPage";
import FavoritePage from "./page/FavoritePage";
import SupportButton from "./components/SupportButton";
import SearchPage from "./page/SearchPage";
import LandingPage from "./page/LandingPage";
import { LoginStateContext } from "./context/LoginStateContext";
import { useState } from "react";

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <LoginStateContext.Provider value={{ isLogin, setIsLogin }}>
          <Header />
          {/* <Toast /> */}
          <div className="Main">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/find-password" element={<FindPasswordPage />} />
              <Route path="/registrate" element={<RegistrateItemPage />} />
              <Route path="/item/:itemId" element={<ItemDetailPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
              <Route path="/mytrade" element={<MyTrade />} />
              <Route path="/allList" element={<ItemListPage />} />
              <Route path="/category/:id" element={<ItemCategoryPage />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/search/:keyWord" element={<SearchPage />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </div>
          <SupportButton />
          <Footer />
        </LoginStateContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
