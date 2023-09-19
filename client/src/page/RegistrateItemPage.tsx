import { useEffect, useRef, useState } from "react";
import { LargeButtonB } from "../components/ButtonComponent";
import {
  Button,
  ButtonWrapper,
  CategoryTagWrapper,
  Container,
  Img,
  ImgContent,
  ImgInput,
  ImgLabel,
  ImgWrapper,
  InfoWrapper,
  InputWrapper,
  RegistrateContent,
  RegistrateWrapper,
  SeletedCategoryTagWrapper,
  SubTitle,
  Text,
  TextArea,
  TextInput,
  Title,
} from "./page_style/RegistrateItemPage_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { getCategory } from "../API/FetchAPI";
import {
  CategoryField,
  RegistrateField,
  RegistrateItemDataField,
} from "../type/type";
import RegistrateSpecification from "../components/RegistrateSpecification";

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

  const handleInputValueChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
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
      if (field.maxLength && value.length <= field.maxLength) {
        setInputValue(value);
      }
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
      {field.subTitle !== "경매기간" && field.subTitle !== "상세설명" ? (
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
      ) : (
        field.subTitle === "상세설명" && (
          <InputWrapper className="text-area">
            <TextArea
              placeholder={field.placeholder}
              value={inputValue}
              onChange={handleInputValueChange}
              maxLength={field.maxLength}
            />
          </InputWrapper>
        )
      )}
      <Text>{field.description}</Text>
    </RegistrateWrapper>
  );
}

function RegistrateItemPage() {
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
    maxLength: 200,
  };

  const itemAuctionTimeField: RegistrateField = {
    subTitle: "경매기간",
    description: "상품을 등록할 기간을 선택하세요.",
    button: [
      { value: 1, btn: "1일" },
      { value: 2, btn: "2일" },
      { value: 3, btn: "3일" },
      { value: 10, btn: "1분" },
    ],
  };

  const itemstartPriceField: RegistrateField = {
    subTitle: "시작 가격",
    description: "시작 가격을 입력해주세요.",
    inputType: "number",
    maxLength: 6,
  };

  const itemBuyNowPriceField: RegistrateField = {
    subTitle: "즉시구매 가격",
    description: "즉시구매 가격을 입력해주세요.(선택)",
    inputType: "number",
    maxLength: 6,
  };

  const itemBidUnitField: RegistrateField = {
    subTitle: "입찰 단위",
    description: "입찰 단위를 선택해 주세요.",
    inputType: "number",
    maxLength: 6,
  };

  const [itemTitle, setItemTitle] = useState<string>("");
  const [itemContent, setItemContent] = useState<string>("");
  const [itemstartPrice, setItemStartPrice] = useState<string>("");
  const [itemBuyNowPrice, setItemBuyNowPrice] = useState<string>("");
  const [itemAuctionTime, setItemAuctionTime] = useState<string>("");
  const [itemBidUnit, setItemBidUnit] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<CategoryField[]>([]);
  const [itemImageFile, setItemImageFile] = useState<File[]>([]);
  const [categoryTag, setCategoryTag] = useState<CategoryField[]>([]);
  const [totalItemInfo, setTotalItemInfo] = useState<RegistrateItemDataField>();
  const [specification, setSpecification] = useState<boolean>(false);
  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategory();
        setCategoryTag(
          data.filter((tag: { id: number; name: string }) => tag.id !== 1),
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectedCategory = (tag: CategoryField) => {
    const selectedItem = categoryTag.find(item => item.name === tag.name);
    if (selectedItem) {
      setItemCategory([selectedItem]);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newImages: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        const fileName = file.name.toLowerCase();
        if (allowedExtensions.some(ext => fileName.endsWith(ext))) {
          newImages.push(file);
        } else {
          alert(`"${file.name}" 파일은 이미지가 아닙니다.`);
        }
      }

      if (itemImageFile.length + newImages.length <= 5) {
        setItemImageFile([...itemImageFile, ...newImages]);
      } else {
        alert("이미지는 최대 5개까지 선택할 수 있습니다.");
      }
    }
  };

  const handleImageRemove = (e: number) => {
    const updatedImages = itemImageFile.filter((_, index) => index !== e);
    setItemImageFile(updatedImages);
  };

  const handlePostRegistrateItem = async () => {
    if (!itemTitle) {
      alert("상품명을 작성해주세요.");
      return;
    }

    if (!itemContent) {
      alert("상세설명을 작성해주세요.");
      return;
    }

    if (itemImageFile.length === 0) {
      alert("이미지를 등록해주세요.");
      return;
    }

    if (!itemAuctionTime) {
      alert("경매기간을 선택해주세요.");
      return;
    }

    if (!itemstartPrice) {
      alert("시작 가격을 작성해주세요.");
      return;
    }

    if (!itemBidUnit) {
      alert("입찰 단위을 작성해주세요.");
      return;
    }

    if (!itemCategory[0]) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (Number(itemBuyNowPrice) !== 0) {
      if (Number(itemBuyNowPrice) < Number(itemstartPrice)) {
        alert("즉시구매가격이 시작가격보다 높아야 합니다.");
        return;
      } else if (Number(itemBuyNowPrice) < Number(itemBidUnit)) {
        alert("즉시구매가격이 입찰단위보다 높아야 합니다.");
        return;
      }
    }
    if (!memberId) {
      return;
    }

    const requestData: RegistrateItemDataField = {
      seller_id: Number(memberId),
      title: itemTitle,
      content: itemContent,
      auction_time: Number(itemAuctionTime),
      category_id: itemCategory[0].id,
      start_price: Number(itemstartPrice),
      bid_unit: Number(itemBidUnit),
      buy_now_price: Number(itemBuyNowPrice),
    };

    setTotalItemInfo(requestData);
    setSpecification(true);
    console.log(totalItemInfo);
  };

  return (
    <Container>
      {specification && totalItemInfo && (
        <RegistrateSpecification
          totalItemInfo={totalItemInfo}
          itemCategory={itemCategory}
          setSpecification={setSpecification}
          itemImageFile={itemImageFile}
        />
      )}
      <RegistrateContent>
        <Title>상품 등록</Title>
        <RegistInputForm field={itemTitleField} setData={setItemTitle} />
        <RegistInputForm field={itemContentField} setData={setItemContent} />
        <RegistrateWrapper>
          <SubTitle>이미지 등록</SubTitle>
          <ImgContent>
            <ImgWrapper>
              <ImgLabel htmlFor="registrate-image-file">
                <FontAwesomeIcon icon={faImage} />
              </ImgLabel>
              <ImgInput
                id="registrate-image-file"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
              />
            </ImgWrapper>
            {itemImageFile.map((image, index) => (
              <ImgWrapper
                key={index}
                className="registrate-image"
                onClick={() => handleImageRemove(index)}
              >
                <Img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
              </ImgWrapper>
            ))}
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
                key={tag.id}
                className="registrate-category-tag-select"
                onClick={() => handleSelectedCategory(tag)}
              >
                {tag.name}
              </Button>
            ))}
          </SeletedCategoryTagWrapper>
          <Text>태그를 선택해 주세요.</Text>
          <CategoryTagWrapper>
            {categoryTag.map((tag: { id: number; name: string }) => (
              <Button
                key={tag.id}
                className={`registrate-category-tag ${
                  itemCategory.includes(tag) && "selected"
                }`}
                onClick={() => handleSelectedCategory(tag)}
              >
                {tag.name}
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
