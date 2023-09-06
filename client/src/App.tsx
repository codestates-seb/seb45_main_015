import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toast from "./alret/Toast";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import FindPasswordPage from "./page/FindPasswordPage";
import ChangePasswordPage from "./page/ChangePasswordPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemListPage from "./page/ItemListPage";
import FavoritePage from "./page/FavoritePage";
import MyTrade from "./page/MyTrade";

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
            <Route path="/itemListPage" element={<ItemListPage />} />
            <Route path="/favoritePage" element={<FavoritePage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/mytrade" element={<MyTrade />} />
          </Routes>
          <MyTrade />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
