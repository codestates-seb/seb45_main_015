import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toast from "./alret/Toast";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import FindPasswordPage from "./page/FindPasswordPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
