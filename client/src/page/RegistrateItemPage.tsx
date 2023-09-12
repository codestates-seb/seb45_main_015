import { useState } from "react";
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
import { postRegistrateItem } from "../API/FetchAPI";

interface RegistrateField {
  subTitle: string;
  placeholder?: string;
  description: string;
  inputType?: string;
  button?: RegistrateButtonField[];
  maxLength?: number;
}

interface RegistrateButtonField {
  value: number | null;
  unit: string;
  mode: string;
}

interface RegistrateInfo {
  seller_id: string;
  title: string;
  content: string;
  auction_time: number;
  category_id: number;
  start_price: number;
  bid_unit: number;
  buy_now_price: number;
}

function RegistInputForm({
  field,
  handleSelectedAuctionPeriod,
  selectedAuctionPeriod,
  handleSelectedBiddingUnit,
  selectedBiddingUnit,
  setInputValue,
  inputValue,
}: {
  field: RegistrateField;
  handleSelectedAuctionPeriod?: (el: RegistrateButtonField | null) => void;
  selectedAuctionPeriod?: RegistrateButtonField | null;
  handleSelectedBiddingUnit?: (el: RegistrateButtonField | null) => void;
  selectedBiddingUnit?: RegistrateButtonField | null;
  setInputValue?: (value: string) => void;
  inputValue?: string;
}) {
  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    console.log(e);

    if (field.inputType === "number") {
      newValue = newValue.replace(/[^\d]/g, "");
    }

    if (field.maxLength && newValue.length > field.maxLength) {
      newValue = newValue.slice(0, field.maxLength);
    }

    if (setInputValue) {
      setInputValue(newValue);
    }

    if (handleSelectedBiddingUnit) {
      handleSelectedBiddingUnit({
        value: parseInt(newValue),
        unit: "원",
        mode: "직접입력",
      });
    }
  };

  return (
    <RegistrateWrapper>
      <SubTitle>{field.subTitle}</SubTitle>
      {field.button && (
        <ButtonWrapper>
          {field.button?.map(el => (
            <Button
              key={el.value}
              className={`registrate-fixed-button ${
                (selectedBiddingUnit && selectedBiddingUnit.mode === el.mode) ||
                (selectedAuctionPeriod &&
                  selectedAuctionPeriod.mode === el.mode)
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                if (handleSelectedAuctionPeriod) {
                  handleSelectedAuctionPeriod(el);
                } else if (handleSelectedBiddingUnit) {
                  handleSelectedBiddingUnit(el);
                }
              }}
            >
              {el.mode}
            </Button>
          ))}
        </ButtonWrapper>
      )}
      {field.subTitle !== "경매기간" && (
        <InputWrapper
          className={field.subTitle === "입찰 단위" ? "budding-unit-field" : ""}
        >
          <TextInput
            placeholder={field.placeholder}
            value={inputValue}
            onChange={handleInputValueChange}
            className={field.inputType === "number" ? "registrate-price" : ""}
            maxLength={field.maxLength}
          />
          {field.inputType === "number" && (
            <Text className="registrate-input-text">000원</Text>
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

  const productNameField: RegistrateField = {
    subTitle: "상품명",
    placeholder: "상품명을 적어주세요.",
    description: "판매할 상품의 이름을 정확히 적어주세요.",
    inputType: "text",
    maxLength: 25,
  };

  const descriptionField: RegistrateField = {
    subTitle: "상세설명",
    placeholder: "상품을 소개해보세요.",
    description: "자세한 설명은 좋은 판매전략이 됩니다.",
    inputType: "text",
    maxLength: 50,
  };

  const auctionPeriodField: RegistrateField = {
    subTitle: "경매기간",
    description: "상품을 등록할 기간을 선택하세요.",
    button: [
      { value: 1, unit: "일", mode: "1초" },
      { value: 2, unit: "일", mode: "2초" },
      { value: 3, unit: "일", mode: "3초" },
      { value: 10, unit: "초", mode: "10초" },
    ],
  };

  const startingPriceField: RegistrateField = {
    subTitle: "시작 가격",
    description: "최소 판매 가격을 입력해주세요.",
    inputType: "number",
    maxLength: 9,
  };

  const buyNowPriceField: RegistrateField = {
    subTitle: "즉시구매 가격",
    description: "최대 판매 가격을 입력해주세요.",
    inputType: "number",
    maxLength: 9,
  };

  const biddingUnitField: RegistrateField = {
    subTitle: "입찰 단위",
    description: "입찰 단위를 선택해 주세요.",
    inputType: "number",
    button: [
      { value: 1000, unit: "원", mode: "1000원" },
      { value: 5000, unit: "원", mode: "5000원" },
      { value: 10000, unit: "원", mode: "10000원" },
      { value: 5, unit: "%", mode: "5%" },
      { value: 10, unit: "%", mode: "10%" },
      { value: null, unit: "원", mode: "직접입력" },
    ],
    maxLength: 9,
  };

  const [selectedAuctionPeriod, setSelectedAuctionPeriod] =
    useState<RegistrateButtonField | null>(null);
  const [selectedBiddingUnit, setSelectedBiddingUnit] =
    useState<RegistrateButtonField | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSelectedAuctionPeriod = (el: RegistrateButtonField) => {
    setSelectedAuctionPeriod(el);
    console.log(selectedAuctionPeriod);
  };

  const handleSelectedBiddingUnit = (el: RegistrateButtonField) => {
    if (el.mode === "직접입력") {
      const correctionValue = Number(`${el.value}000`);
      setSelectedBiddingUnit({ ...el, value: correctionValue });
    } else {
      setSelectedBiddingUnit(el);
      setInputValue("");
    }

    console.log(selectedBiddingUnit);
  };

  const handleSelectedCategory = (tag: string) => {
    if (selectedCategory.includes(tag)) {
      setSelectedCategory(selectedCategory.filter(item => item !== tag));
    } else if (selectedCategory.length < 3) {
      setSelectedCategory([...selectedCategory, tag]);
    }
    console.log(selectedCategory);
  };

  const handlePostRegistrateItem = () => {
    const seller_id = "seller123";
    const title = "상품 제목";
    const content = "상품 설명";
    const auction_time = 7;
    const category_id = 1;
    const start_price = 10000;
    const bid_unit = 1000;
    const buy_now_price = 20000;

    postRegistrateItem(
      seller_id,
      title,
      content,
      auction_time,
      category_id,
      start_price,
      bid_unit,
      buy_now_price,
    );
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
          </ImgContent>
          <Text>판매할 상품의 이미지를 등록하세요.</Text>
        </RegistrateWrapper>
        <RegistInputForm
          field={auctionPeriodField}
          handleSelectedAuctionPeriod={handleSelectedAuctionPeriod}
          selectedAuctionPeriod={selectedAuctionPeriod}
        />
        <InfoWrapper>
          <RegistInputForm field={startingPriceField} />
          <RegistInputForm field={buyNowPriceField} />
        </InfoWrapper>
        <RegistInputForm
          field={biddingUnitField}
          handleSelectedBiddingUnit={handleSelectedBiddingUnit}
          selectedBiddingUnit={selectedBiddingUnit}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <RegistrateWrapper>
          <SubTitle>카테고리</SubTitle>
          <SeletedCategoryTagWrapper>
            {selectedCategory.map(tag => (
              <Button
                key={tag}
                className="registrate-category-tag-select"
                onClick={() => handleSelectedCategory(tag)}
              >
                {tag}
              </Button>
            ))}
          </SeletedCategoryTagWrapper>
          <Text>태그는 최대 3개까지 선택이 가능합니다.</Text>
          <CategoryTagWrapper>
            {categoryTag.map(tag => (
              <Button
                key={tag}
                className={`registrate-category-tag ${
                  selectedCategory.includes(tag) && "selected"
                }`}
                onClick={() => handleSelectedCategory(tag)}
              >
                {tag}
              </Button>
            ))}
          </CategoryTagWrapper>
        </RegistrateWrapper>
        <ButtonWrapper
          className="registrate-button-wrapper"
          onClick={handlePostRegistrateItem}
        >
          <LargeButtonB value="등록하기" />
        </ButtonWrapper>
      </RegistrateContent>
    </Container>
  );
}

export default RegistrateItemPage;
