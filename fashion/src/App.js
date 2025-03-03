import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import ProductDetails from "./components/ProductDetails";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";

import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Payment from "./pages/Payment";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <AppContent />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Hide Navbar & Footer on Login & Signup pages
  const hideNavbarFooter = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbarFooter && <NavigationBar />}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
};

export default App;
