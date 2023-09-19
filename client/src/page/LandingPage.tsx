import LandingPageContainer from "./page_style/LandingPage_styled";
import LandingTop from "../components/LandingTop";
import LandingMiddle from "../components/LandingMiddle";
import LandingBottom from "../components/LandingBottom";

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <LandingTop />
      <LandingMiddle />
      <LandingBottom />
    </LandingPageContainer>
  );
};

export default LandingPage;
