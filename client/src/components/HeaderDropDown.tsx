import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Decoration,
  DropDown,
  Icon,
  Text,
  UserName,
  Wrapper,
} from "./components_style/HeaderDropDown_styled";
import { Link } from "react-router-dom";
import { useLogout } from "../API/FetchAPI";
import { LoginStateContext } from "../context/LoginStateContext";

const nav = [
  {
    page: "마이페이지",
    icon: <FontAwesomeIcon icon={faUser} />,
    router: "/mypage",
  },
];

function HeaderDropDown() {
  const { currentLogin } = useContext(LoginStateContext);
  const nickname = localStorage.getItem("memberName");
  const mutation = useLogout();

  const logoutHandler = () => {
    mutation.mutate();
    currentLogin.current = false;
  };

  return (
    <DropDown>
      <Container>
        <UserName>{nickname}님</UserName>
        {nav.map(item => (
          <Link to={item.router} key={item.page}>
            <Wrapper>
              <Icon>{item.icon}</Icon>
              <Text>{item.page}</Text>
            </Wrapper>
          </Link>
        ))}
        <Wrapper>
          <Icon>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Icon>
          <Text onClick={logoutHandler}>로그아웃</Text>
        </Wrapper>
      </Container>
      <Decoration />
    </DropDown>
  );
}

export default HeaderDropDown;
