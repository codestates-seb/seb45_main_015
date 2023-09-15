<<<<<<< HEAD
import { useRegistrateItem, useRegistrateItemImage } from "../API/FetchAPI";
=======
>>>>>>> abb179d (feat: RegistrateItemPage 명세서 제작)
import {
  CategoryField,
  RegistrateItemDataField,
  SpecificationField,
} from "../type/type";
import { MediumButtonB, MediumButtonD } from "./ButtonComponent";
import {
  ButtonWrapper,
  Container,
  Content,
  ContentContainer,
  ContentWrapper,
  Text,
  Title,
  Wrapper,
} from "./components_style/RegistrateSpecification_styled";

function RegistrateSpecification({
  totalItemInfo,
  itemCategory,
<<<<<<< HEAD
  setSpecification,
  itemImageFile,
}: {
  totalItemInfo: RegistrateItemDataField;
  itemCategory: CategoryField[];
  setSpecification: (value: boolean) => void;
  itemImageFile: File[];
=======
  handlePostRegistrateItem,
  setSpecification,
}: {
  totalItemInfo: RegistrateItemDataField;
  itemCategory: CategoryField[];
  handlePostRegistrateItem: () => Promise<void>;
  setSpecification: (value: boolean) => void;
>>>>>>> abb179d (feat: RegistrateItemPage 명세서 제작)
}) {
  const total: SpecificationField[] = [
    { title: "상품명", value: totalItemInfo.title },
    { title: "경매기간", value: totalItemInfo.auction_time, unit: "일" },
    {
      title: "시작가격",
      value: totalItemInfo.start_price.toLocaleString(),
      unit: "원",
    },
    {
      title: "즉시구매가",
      value: Number(totalItemInfo.buy_now_price).toLocaleString(),
      unit: "원",
    },
    {
      title: "입찰단위",
      value: totalItemInfo.bid_unit.toLocaleString(),
      unit: "원",
    },
    { title: "카테고리", value: itemCategory[0].name },
  ];

  const handleCloseSpecification = () => {
    setSpecification(false);
  };

<<<<<<< HEAD
  const handlePostRegistrateItem = () => {
    useRegistrateItem(totalItemInfo).then(data => {
      useRegistrateItemImage(itemImageFile, data.item_id);
    });
  };

=======
>>>>>>> abb179d (feat: RegistrateItemPage 명세서 제작)
  return (
    <Container>
      <Content>
        <ContentContainer>
          <Title>명세서</Title>
          {total.map(data => (
            <Wrapper key={data.title}>
              <Text className="fixed-text">{data.title}</Text>
              <ContentWrapper>
                <Text>{data.value}</Text>
                <Text className="fixed-text">{data.unit}</Text>
              </ContentWrapper>
            </Wrapper>
          ))}
        </ContentContainer>
        <Wrapper>
          <ButtonWrapper onClick={handlePostRegistrateItem}>
            <MediumButtonB value="등록하기" />
          </ButtonWrapper>
          <ButtonWrapper onClick={handleCloseSpecification}>
            <MediumButtonD value="취소하기" />
          </ButtonWrapper>
        </Wrapper>
      </Content>
    </Container>
  );
}

export default RegistrateSpecification;
