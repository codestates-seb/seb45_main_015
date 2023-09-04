import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemListCard from "./components/ItemListCard";

function App() {
  return (
    <div className="App">
      <Header />
      <main>Page가 다 들어감</main>
      <ItemListCard />
      <Footer />
    </div>
  );
}

export default App;
