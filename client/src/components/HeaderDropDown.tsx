import React from "react";
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

const nav = [
  {
    page: "마이페이지",
    icon: <FontAwesomeIcon icon={faUser} />,
    router: "/mypage",
  },
  {
    page: "로그아웃",
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    router: "/",
  },
];

function HeaderDropDown() {
  return (
    <DropDown>
      <Container>
        <UserName>(사용자 이름) 님</UserName>
        {nav.map(item => (
          <Link to={item.router}>
            <Wrapper key={item.page}>
              <Icon>{item.icon}</Icon>
              <Text>{item.page}</Text>
            </Wrapper>
          </Link>
        ))}
      </Container>
      <Decoration />
    </DropDown>
  );
}

export default HeaderDropDown;
