import "./App.css";
import { Navbar } from "./Components/Navbar/navbar.jsx";
import { Home } from "./Pages/Home/home.jsx";
import { Route, Routes } from "react-router-dom";
import { ProductDetail } from "./Pages/ProductDetailsPage/productDetails.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product-details/:id" element={<ProductDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
