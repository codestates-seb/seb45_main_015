// import React from "react";
// import ItemListPageContainer from "./page_style/itemListPage_styled";
// import { Link } from "react-router-dom";
// import MainCategory from "../components/MainCategory";
// import MyCarousel from "../components/Carousel";
// import ItemCard from "../components/ItemCard";
// import { MediumButtonB } from "../components/ButtonComponent";

// const ItemCategoryPage: React.FC = () => {
//   const carouselItems = [
//     {
//       imageUrl:
//         "https://i.pinimg.com/564x/1c/72/93/1c7293afa416f1a1a51c3c723536bba9.jpg",
//       caption: "Image 1",
//     },
//     {
//       imageUrl:
//         "https://i.pinimg.com/564x/6c/b3/3a/6cb33ac0c0a2c5942d007014da8c6c44.jpg",
//       caption: "Image 2",
//     },
//     {
//       imageUrl:
//         "https://i.pinimg.com/564x/dd/bf/38/ddbf38f2067578c9da22378a83eaddb3.jpg",
//       caption: "Image 3",
//     },
//   ];
//   return (
//     <ItemListPageContainer>
//       <div className="listPageCarousel">
//         <MyCarousel items={carouselItems} />
//       </div>
//       <div className="mainListcontainer">
//         <MainCategory />
//         <div className="contentWrap">
//           <div className="content">
//             <h2 className="contenTitle">추천 상품</h2>
//             <div>
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//             </div>
//           </div>
//           <div className="content">
//             <h2 className="contenTitle">인기 상품</h2>
//             <div>
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//             </div>
//           </div>
//           <div className="content">
//             <h2 className="contenTitle">전체 상품</h2>
//             <div>
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//               <ItemCard />
//             </div>
//           </div>
//           <div className="buttontest">
//             <MediumButtonB value={"더보기"} />
//           </div>
//         </div>
//       </div>
//     </ItemListPageContainer>
//   );
// };

// export default ItemCategoryPage;
