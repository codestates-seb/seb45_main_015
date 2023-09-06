import styled from "styled-components";
import globalTokens from "../../design_tokens/global.json";

const FavoritePageContainer = styled.div`
  border: 1px solid red;

  & .topButton {
    margin: 0 auto;
  }

  & .itemcontainer {
    display: grid;
    justify-items: center;
    flex-wrap: wrap;
    @media (min-width: 0px) {
      grid-template-columns: repeat(1, auto);
    }
    @media (min-width: 260px) {
      grid-template-columns: repeat(2, auto);
    }
    @media (min-width: 530px) {
      grid-template-columns: repeat(3, auto);
    }
    @media (min-width: 1050px) {
      grid-template-columns: repeat(4, auto);
    }
  }
`;

export default FavoritePageContainer;
