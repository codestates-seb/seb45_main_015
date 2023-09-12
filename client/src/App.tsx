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
            <Route path="/registrate" element={<RegistrateItemPage />} />
            <Route path="/detail" element={<ItemDetailPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/mytrade" element={<MyTrade />} />
            <Route path="/allList" element={<ItemListPage />} />
            <Route path="/category" element={<ItemCategoryPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
