import { LargeButtonB } from "../components/ButtonComponent";
import {
  Button,
  ButtonWrapper,
  CategoryTagWrapper,
  Container,
  Img,
  ImgContent,
  ImgWrapper,
  InfoWrapper,
  InputWrapper,
  RegistrateContent,
  RegistrateWrapper,
  SeletedCategoryTagWrapper,
  SubTitle,
  Text,
  TextInput,
  Title,
} from "./page_style/RegistrateItemPage_styled";

interface Field {
  subTitle: string;
  placeholder?: string;
  description: string;
  inputType: string;
  button?: string[];
}

function RegistInputForm({ field }: { field: Field }) {
  return (
    <RegistrateWrapper>
      <SubTitle>{field.subTitle}</SubTitle>
      {field.button && (
        <ButtonWrapper>
          {field.button?.map(el => (
            <Button key={el} className="registrate-fixed-button">
              {el}
            </Button>
          ))}
        </ButtonWrapper>
      )}
      {field.subTitle !== "경매기간" && (
        <InputWrapper
          className={field.subTitle === "입찰 단위" ? "budding-unit-field" : ""}
        >
          <TextInput placeholder={field.placeholder} />
          {field.inputType === "number" && (
            <Text className="registrate-input-text">원</Text>
          )}
        </InputWrapper>
      )}
      <Text>{field.description}</Text>
    </RegistrateWrapper>
  );
}

function RegistrateItemPage() {
  const categoryTag = [
    "패션의류/잡화",
    "식품",
    "출산/유아동",
    "주방용품",
    "생활용품",
    "인테리어",
    "가전/디지털",
    "뷰티",
    "스포츠/레저",
    "자동차용품",
    "도서/음반CD",
    "완구/취미",
    "문구/오피스",
    "반려동물용품",
    "헬스/건강식품",
  ];

  const productNameField: Field = {
    subTitle: "상품명",
    placeholder: "상품명을 적어주세요.",
    description: "판매할 상품의 이름을 정확히 적어주세요.",
    inputType: "string",
  };

  const descriptionField: Field = {
    subTitle: "상세설명",
    placeholder: "상품을 소개해보세요.",
    description: "자세한 설명은 좋은 판매전략이 됩니다.",
    inputType: "string",
  };

  const auctionPeriodField: Field = {
    subTitle: "경매기간",
    description: "상품을 등록할 기간을 선택하세요.",
    inputType: "string",
    button: ["1일", "2일", "3일", "10초"],
  };

  const startingPriceField: Field = {
    subTitle: "시작 가격",
    placeholder: "직접입력",
    description: "최소 판매 가격을 입력해주세요.",
    inputType: "number",
  };

  const buyNowPriceField: Field = {
    subTitle: "즉시구매 가격",
    placeholder: "직접입력",
    description: "최대 판매 가격을 입력해주세요.",
    inputType: "number",
  };

  const biddingUnitField: Field = {
    subTitle: "입찰 단위",
    placeholder: "직접입력",
    description: "입찰 단위를 선택해 주세요.",
    inputType: "number",
    button: ["1000원", "5000원", "10000원", "5%", "10%", "직접입력"],
  };

  return (
    <Container>
      <RegistrateContent>
        <Title>상품 등록</Title>
        <RegistInputForm field={productNameField} />
        <RegistInputForm field={descriptionField} />
        <RegistrateWrapper>
          <SubTitle>이미지 등록</SubTitle>
          <ImgContent>
            <ImgWrapper>
              <Img></Img>
            </ImgWrapper>
            <ImgWrapper>
              <Img></Img>
            </ImgWrapper>
            <ImgWrapper>
              <Img></Img>
            </ImgWrapper>
            <ImgWrapper>
              <Img></Img>
            </ImgWrapper>
            <ImgWrapper>
              <Img></Img>
            </ImgWrapper>
            <ImgWrapper>
              <Img></Img>
            </ImgWrapper>
            <ImgWrapper>
              <Img></Img>
            </ImgWrapper>
            <ImgWrapper>
              <Img></Img>
            </ImgWrapper>
          </ImgContent>
          <Text>판매할 상품의 이미지를 등록하세요.</Text>
        </RegistrateWrapper>
        <RegistInputForm field={auctionPeriodField} />
        <InfoWrapper>
          <RegistInputForm field={startingPriceField} />
          <RegistInputForm field={buyNowPriceField} />
        </InfoWrapper>
        <RegistInputForm field={biddingUnitField} />
        <RegistrateWrapper>
          <SubTitle>카테고리</SubTitle>
          <SeletedCategoryTagWrapper>
            <Button className="registrate-category-tag-select">
              패션의류/잡화
            </Button>
            <Button className="registrate-category-tag-select">
              패션의류/잡화
            </Button>
            <Button className="registrate-category-tag-select">
              패션의류/잡화
            </Button>
          </SeletedCategoryTagWrapper>
          <Text>태그는 최대 3개까지 선택이 가능합니다.</Text>
          <CategoryTagWrapper>
            {categoryTag.map(tag => (
              <Button key={tag} className="registrate-category-tag">
                {tag}
              </Button>
            ))}
          </CategoryTagWrapper>
        </RegistrateWrapper>
        <ButtonWrapper className="registrate-button-wrapper">
          <LargeButtonB value="등록하기" />
        </ButtonWrapper>
      </RegistrateContent>
    </Container>
  );
}

export default RegistrateItemPage;
