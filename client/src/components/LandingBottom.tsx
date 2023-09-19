import { LandingBottomBox } from "./components_style/LandingBottom_styled";
import java from "../images/java.png";
import boot from "../images/SpringBoot.png";
import security from "../images/Security.png";
import aws from "../images/AWS.png";
import mysql from "../images/mysql.png";
import spring from "../images/Spring.png";
import html from "../images/html.png";
import css from "../images/css.png";
import react from "../images/react.png";
import ts from "../images/typescript.png";
import axios from "../images/axios.png";
import query from "../images/react-query.png";
import prettier from "../images/Prettier.png";
import eslint from "../images/ESLint.png";

const LandingMiddle = () => {
  return (
    <LandingBottomBox>
      <div className="member">
        <h2>
          Project Member
          <br />
          프로젝트 맴버
        </h2>
        <div className="BEmember">
          <h3>BackEnd</h3>
          <div className="person">
            <p>BE 이경찬</p>
            <p>BE 김재한</p>
            <p>BE 이재우</p>
          </div>
          <div className="BEskill">
            <div className="itemBox">
              <img src={java} alt="JAVA" />
              <p>JAVA</p>
            </div>
            <div className="itemBox">
              <img src={boot} alt="Spring Boot" />
              <p>Spring Boot</p>
            </div>
            <div className="itemBox">
              <img src={security} alt="Spring Security" />
              <p>Spring Security</p>
            </div>
            <div className="itemBox">
              <img src={aws} alt="AWS" />
              <p>AWS</p>
            </div>
            <div className="itemBox">
              <img src={mysql} alt="MySQL" />
              <p>MySQL</p>
            </div>
            <div className="itemBox">
              <img src={spring} alt="Spring" />
              <p>Spring</p>
            </div>
          </div>
        </div>
        <div className="FEmember">
          <h3>FE</h3>
          <div className="person">
            <p>FE 김종회</p>
            <p>FE 권순범</p>
            <p>FE 김태수</p>
          </div>
          <div className="FEskill">
            <div className="itemBox">
              <img src={html} alt="HTML" />
              <p>HTML</p>
            </div>
            <div className="itemBox">
              <img src={css} alt="CSS" />
              <p>CSS</p>
            </div>
            <div className="itemBox">
              <img src={react} alt="React" />
              <p>React</p>
            </div>
            <div className="itemBox">
              <img src={ts} alt="TypeScript" />
              <p>TypeScript</p>
            </div>
            <div className="itemBox">
              <img src={axios} alt="Axios" />
              <p>Axios</p>
            </div>
            <div className="itemBox">
              <img src={query} alt="React-Query" />
              <p>React=Query</p>
            </div>
            <div className="itemBox">
              <img src={eslint} alt="ESLint" />
              <p>ESLint</p>
            </div>
            <div className="itemBox">
              <img src={prettier} alt="Prettier" />
              <p>Prettier</p>
            </div>
          </div>
        </div>
      </div>
    </LandingBottomBox>
  );
};

export default LandingMiddle;
