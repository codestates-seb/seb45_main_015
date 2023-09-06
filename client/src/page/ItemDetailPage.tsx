import {
  Button,
  Container,
  Content,
  ContentSection,
  Icon,
  Img,
  ImgList,
  ImgListContent,
  ImgWrapper,
  ItemDetailContainer,
  ItemDetailContent,
  Text,
  Wrapper,
} from "./page_style/ItemDetailPage_styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function ItemDetailPage() {
  return (
    <Container>
      <ItemDetailContainer>
        <ItemDetailContent className="center">
          <Text className="detail-timer">종료시간 24 : 00 : 00</Text>
        </ItemDetailContent>
        <ItemDetailContent>
          <Text className="detail-path">{`카테고리 > 패션의류/잡화`}</Text>
        </ItemDetailContent>
        <ItemDetailContent className="space-between">
          <ContentSection>
            <ImgWrapper className="detail-main-img">
              <Img />
            </ImgWrapper>
            <ImgListContent>
              <Icon>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Icon>
              <ImgList>
                {Array.from({ length: 5 }, (_, index) => (
                  <ImgWrapper className="detail-sub-img">
                    <Img />
                  </ImgWrapper>
                ))}
              </ImgList>
              <Icon>
                <FontAwesomeIcon icon={faChevronRight} />
              </Icon>
            </ImgListContent>
          </ContentSection>
          <ContentSection>
            <Content className="detail-info-content">
              <Wrapper className="column">
                <Text className="detail-title">초록색 반스 신발 280</Text>
                <Text className="detail-info-bidding">
                  현재 입찰중인 물건입니다.
                </Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">최저가</Text>
                <Text className="detail-info">0원</Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">입찰가</Text>
                <Text className="detail-info">0원</Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">즉시구매가</Text>
                <Text className="detail-info">0원</Text>
              </Wrapper>
              <Wrapper className="space-between">
                <Text className="detail-info-init">호가</Text>
                <Text className="detail-info">0원</Text>
              </Wrapper>
            </Content>
            <Content className="detail-button-content">
              <Wrapper className="space-between">
                <Button>입찰하기</Button>
                <Button>즉시구매</Button>
              </Wrapper>
              <Button>찜하기</Button>
              <Button>수정하기</Button>
            </Content>
          </ContentSection>
        </ItemDetailContent>
        <ItemDetailContent></ItemDetailContent>
        <ItemDetailContent></ItemDetailContent>
      </ItemDetailContainer>
    </Container>
  );
}

export default ItemDetailPage;
