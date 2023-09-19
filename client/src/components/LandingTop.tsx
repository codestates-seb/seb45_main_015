import Logo from "../images/Logo.png";
import { Link } from "react-router-dom";
import { LandingTopbox } from "./components_style/LandingTop_styled";
import { SmallButtonB } from "./ButtonComponent";
import contentImg1 from "../images/content1Img.png";
import contentImg2 from "../images/content2Img.png";
import contentImg3 from "../images/content3Img.png";

const LandingTop = () => {
  return (
    <LandingTopbox>
      <div className="first_Content">
        <div className="textBox">
          <h1>
            Second
            <br />
            Hand
          </h1>
          <p>
            한정판 스니커즈부터 명품, 가전, 테크, 음반, 트레이딩 카드 까지!
            Second Hand에서 바로 구매! 100% 정품. 한정판을 구매하는 가장 안전한
            방법!
          </p>
          <div className="first_Content_button">
            <Link to="/allList">
              <SmallButtonB value="거래하러 가기" />
            </Link>
          </div>
        </div>
        <img src={Logo} alt="Logo" className="Logo" />
      </div>
      <div className="second_content">
        <img src={contentImg1} alt="product1" className="firsfImg" />
        <img src={contentImg2} alt="product2" className="secondImg" />
        <img src={contentImg3} alt="product3" className="thirdImg" />
      </div>
    </LandingTopbox>
  );
};

export default LandingTop;
