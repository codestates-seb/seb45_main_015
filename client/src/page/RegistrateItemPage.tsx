import { useRef, useState } from "react";
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

interface RegistrateField {
  subTitle: string;
  placeholder?: string;
  description: string;
  inputType?: string;
  button?: RegistrateButtonField[];
  maxLength?: number;
}

interface RegistrateButtonField {
  value: number;
  btn: string;
}

function RegistInputForm({
  field,
  setData,
}: {
  field: RegistrateField;
  setData: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [button, setButton] = useState<string | null>("");
  const previousValueRef = useRef("");

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (field.inputType === "number") {
      let numberValue = value.replace(/[^0-9]/g, "");
      if (numberValue.length > 1 && numberValue[0] === "0") {
        numberValue = numberValue.slice(1);
      }
      if (numberValue !== previousValueRef.current) {
        previousValueRef.current = numberValue;
      }
      setInputValue(numberValue);
      setData(numberValue + "000");
    } else {
      setInputValue(value);
      setData(value);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setButton(e.currentTarget.textContent);
    setData(e.currentTarget.value);
  };

  return (
    <RegistrateWrapper>
      <SubTitle>{field.subTitle}</SubTitle>
      {field.button && (
        <ButtonWrapper>
          {field.button?.map(el => (
            <Button
              key={el.value}
              value={String(el.value)}
              className={`registrate-fixed-button ${
                button === el.btn && "selected"
              }`}
              onClick={handleButtonClick}
            >
              {el.btn}
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
            className={field.inputType === "number" ? "registrate-price" : ""}
            type="text"
            value={inputValue}
            onChange={handleInputValueChange}
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

  const itemTitleField: RegistrateField = {
    subTitle: "상품명",
    placeholder: "상품명을 적어주세요.",
    description: "판매할 상품의 이름을 적어주세요.",
    inputType: "text",
    maxLength: 25,
  };

  const itemContentField: RegistrateField = {
    subTitle: "상세설명",
    placeholder: "상품을 소개해보세요.",
    description: "자세한 설명은 좋은 판매전략이 됩니다.",
    inputType: "text",
    maxLength: 50,
  };

  const itemAuctionTimeField: RegistrateField = {
    subTitle: "경매기간",
    description: "상품을 등록할 기간을 선택하세요.",
    button: [
      { value: 1, btn: "1일" },
      { value: 2, btn: "2일" },
      { value: 3, btn: "3일" },
      { value: 10, btn: "10초" },
    ],
  };

  const itemstartPriceField: RegistrateField = {
    subTitle: "시작 가격",
    description: "최소 판매 가격을 입력해주세요.",
    inputType: "number",
    maxLength: 9,
  };

  const itemBuyNowPriceField: RegistrateField = {
    subTitle: "즉시구매 가격",
    description: "최대 판매 가격을 입력해주세요.",
    inputType: "number",
    maxLength: 9,
  };

  const itemBidUnitField: RegistrateField = {
    subTitle: "입찰 단위",
    description: "입찰 단위를 선택해 주세요.",
    inputType: "number",
    maxLength: 9,
  };

  const [itemTitle, setItemTitle] = useState<string>("");
  const [itemContent, setItemContent] = useState<string>("");
  const [itemstartPrice, setItemStartPrice] = useState<string>("");
  const [itemBuyNowPrice, setItemBuyNowPrice] = useState<string>("");
  const [itemAuctionTime, setItemAuctionTime] = useState<string>("");
  const [itemBidUnit, setItemBidUnit] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<string[]>([]);

  const handleSelectedCategory = (tag: string) => {
    if (itemCategory.includes(tag)) {
      setItemCategory(itemCategory.filter(item => item !== tag));
    } else if (itemCategory.length < 3) {
      setItemCategory([...itemCategory, tag]);
    }
  };

  const handlePostRegistrateItem = () => {
    console.log("---------------");
    console.log("제목: " + itemTitle);
    console.log("내용: " + itemContent);
    console.log("시작가: " + Number(itemstartPrice));
    console.log("즉시구매가: " + Number(itemBuyNowPrice));
    console.log("경매기간: " + Number(itemAuctionTime));
    console.log("호가: " + Number(itemBidUnit));
    console.log("카테고리: " + itemCategory);
    console.log("---------------");
  };

  return (
    <Container>
      <RegistrateContent>
        <Title>상품 등록</Title>
        <RegistInputForm field={itemTitleField} setData={setItemTitle} />
        <RegistInputForm field={itemContentField} setData={setItemContent} />
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
          field={itemAuctionTimeField}
          setData={setItemAuctionTime}
        />
        <InfoWrapper>
          <RegistInputForm
            field={itemstartPriceField}
            setData={setItemStartPrice}
          />
          <RegistInputForm
            field={itemBuyNowPriceField}
            setData={setItemBuyNowPrice}
          />
        </InfoWrapper>
        <RegistInputForm field={itemBidUnitField} setData={setItemBidUnit} />
        <RegistrateWrapper>
          <SubTitle>카테고리</SubTitle>
          <SeletedCategoryTagWrapper>
            {itemCategory.map(tag => (
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
                  itemCategory.includes(tag) && "selected"
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
