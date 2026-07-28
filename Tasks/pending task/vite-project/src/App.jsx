import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

const App = () => {

  const products = [
    // Electronics
    {
      id: 1,
      category: "Electronics",
      title: "Wireless Bluetooth Headphones",
      price: 99.99,
      rating: 5,
      reviews: 120,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      category: "Electronics",
      title: "Gaming Mouse",
      price: 39.99,
      rating: 4.5,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    },
    {
      id: 3,
      category: "Electronics",
      title: "Mechanical Keyboard",
      price: 79.99,
      rating: 4.8,
      reviews: 230,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    },

    // Clothing
    {
      id: 4,
      category: "Clothing",
      title: "Oversized Hoodie",
      price: 49.99,
      rating: 4.8,
      reviews: 150,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
      id: 5,
      category: "Clothing",
      title: "Casual T-Shirt",
      price: 19.99,
      rating: 4.5,
      reviews: 100,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    },

    // Furniture
    {
      id: 6,
      category: "Furniture",
      title: "Modern Sofa",
      price: 499.99,
      rating: 4.9,
      reviews: 80,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    },
    {
      id: 7,
      category: "Furniture",
      title: "Wooden Chair",
      price: 129.99,
      rating: 4.6,
      reviews: 60,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },

    // Home
    {
      id: 8,
      category: "Home",
      title: "Table Lamp",
      price: 29.99,
      rating: 4.5,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    {
      id: 9,
      category: "Home",
      title: "Wall Clock",
      price: 24.99,
      rating: 4.4,
      reviews: 75,
      image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    },

    // Accessories
    {
      id: 10,
      category: "Accessories",
      title: "Leather Wallet",
      price: 24.99,
      rating: 4.7,
      reviews: 70,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    },
    {
      id: 11,
      category: "Accessories",
      title: "Sunglasses",
      price: 34.99,
      rating: 4.6,
      reviews: 110,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    },

    // Sports
    {
      id: 12,
      category: "Sports",
      title: "Football",
      price: 19.99,
      rating: 4.8,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
    },
    {
      id: 13,
      category: "Sports",
      title: "Cricket Bat",
      price: 59.99,
      rating: 4.9,
      reviews: 140,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
    },
  ];
  const [active, setActive] = useState(false);
  const [cartItems, setCartItems] = useState([])

  return (
    <div>
      <Navbar setActive={setActive} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop setCartItems={setCartItems} setActive={setActive} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <Cart active={active} setActive={setActive} cartItems={cartItems} />
    </div>
  );
};

export default App;
