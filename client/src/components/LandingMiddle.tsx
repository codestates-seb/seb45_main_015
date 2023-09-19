import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "../API/FetchAPI";
import { ItemCard } from "../components/ItemCard";
import beauty from "../images/beauty.png";
import sports from "../images/sports.png";
import car from "../images/car.png";
import book from "../images/book.png";
import hobby from "../images/hobby.png";
import pet from "../images/pet.png";
import health from "../images/health.png";
import fashion from "../images/fashion.png";
import digital from "../images/digital.png";
import baby from "../images/baby.png";
import food from "../images/food.png";
import kitchen from "../images/kitchen.png";
import life from "../images/life.png";
import home from "../images/home.png";
import office from "../images/office.png";
import { LandingMiddeBox } from "./components_style/LandingMiddle_styled";
import Loading from "../loading/Loading";

const LandingMiddle = () => {
  const handleItemRefetch = () => {
    refetch();
  };

  const getData = async () => {
    const result = await getItem(4);
    return result;
  };

  const { data, isLoading, isError, refetch } = useQuery(["itemList"], getData);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{`Error fetching data ${isError}`}</div>;
  }
  return (
    <LandingMiddeBox>
      <div className="section">
        <div className="categoty">
          <h2>
            Kategotie
            <br />
            카테고리
          </h2>
          <div className="categoryWrap">
            <Link to="/category/2">
              <div className="categotyItem">
                <img src={fashion} alt="fashion" />
                <p>패션의류/잡화</p>
              </div>
            </Link>
            <Link to="/category/3">
              <div className="categotyItem">
                <img src={beauty} alt="beauty" />
                <p>뷰티</p>
              </div>
            </Link>
            <Link to="/category/4">
              <div className="categotyItem">
                <img src={baby} alt="baby" />
                <p>출산/유아동</p>
              </div>
            </Link>
            <Link to="/category/5">
              <div className="categotyItem">
                <img src={food} alt="food" />
                <p>식품</p>
              </div>
            </Link>
            <Link to="/category/6">
              <div className="categotyItem">
                <img src={kitchen} alt="kitchen" />
                <p>주방용품</p>
              </div>
            </Link>
            <Link to="/category/7">
              <div className="categotyItem">
                <img src={life} alt="life" />
                <p>생활용품</p>
              </div>
            </Link>
            <Link to="/category/8">
              <div className="categotyItem">
                <img src={home} alt="home" />
                <p>홈인테리어</p>
              </div>
            </Link>
            <Link to="/category/9">
              <div className="categotyItem">
                <img src={digital} alt="digital" />
                <p>가전디지털</p>
              </div>
            </Link>
            <Link to="/category/10">
              <div className="categotyItem">
                <img src={sports} alt="sports" />
                <p>스포츠/레저</p>
              </div>
            </Link>
            <Link to="/category/11">
              <div className="categotyItem">
                <img src={car} alt="car" />
                <p>자동차용품</p>
              </div>
            </Link>
            <Link to="/category/12">
              <div className="categotyItem">
                <img src={book} alt="book" />
                <p>도서/음반/DVD</p>
              </div>
            </Link>
            <Link to="/category/13">
              <div className="categotyItem">
                <img src={hobby} alt="hobby" />
                <p>완구/취미</p>
              </div>
            </Link>
            <Link to="/category/2">
              <div className="categotyItem">
                <img src={office} alt="office" />
                <p>문구/오피스</p>
              </div>
            </Link>
            <Link to="/category/14">
              <div className="categotyItem">
                <img src={pet} alt="pet" />
                <p>반려동물용품</p>
              </div>
            </Link>
            <Link to="/category/16">
              <div className="categotyItem">
                <img src={health} alt="health" />
                <p>헬스/건강식품</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="popular">
          <h2>
            Most Popular
            <br />
            실시간 인기 경매
          </h2>
          <div className="popularWrap">
            <ul>
              {data.map((el: any, index: number) => (
                <li key={index}>
                  <ItemCard
                    cardData={el}
                    favoriteState={el.in_wish_list}
                    onItemRefetch={handleItemRefetch}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </LandingMiddeBox>
  );
};

export default LandingMiddle;
