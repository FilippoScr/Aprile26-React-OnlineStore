import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Purchased from "./pages/Purchased";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";
import { OrdersProvider } from "./contexts/OrdersContext";
import Error from "./pages/Error";
import "./style.css";

export default function App() {
  return (
    <>
      <Header />
      <Nav />
      <WishlistProvider>
        <CartProvider>
          <OrdersProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/products" element={<Products />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/purchased" element={<Purchased />} />
              <Route path="/error" element={<Error />} />
            </Routes>
          </OrdersProvider>
        </CartProvider>
      </WishlistProvider>
      <Footer />
    </>
  );
}