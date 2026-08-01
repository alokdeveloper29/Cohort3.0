import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [product, setProduct] = useState([
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
      title: "Smart Watch Series 5",
      price: 299.99,
      rating: 4.9,
      reviews: 85,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    },
    {
      id: 4,
      category: "Electronics",
      title: "Portable Bluetooth Speaker",
      price: 59.99,
      rating: 4.7,
      reviews: 110,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    },
    {
      id: 5,
      category: "Electronics",
      title: "Mechanical Keyboard",
      price: 89.99,
      rating: 4.8,
      reviews: 130,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    },

    // Clothing
    {
      id: 6,
      category: "Clothing",
      title: "Oversized Hoodie",
      price: 49.99,
      rating: 4.8,
      reviews: 150,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
      id: 7,
      category: "Clothing",
      title: "Comfortable Cotton T-Shirt",
      price: 24.99,
      rating: 4.7,
      reviews: 200,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    },
    {
      id: 8,
      category: "Clothing",
      title: "Denim Jacket",
      price: 69.99,
      rating: 4.6,
      reviews: 90,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    },
    {
      id: 9,
      category: "Clothing",
      title: "Casual Shirt",
      price: 34.99,
      rating: 4.5,
      reviews: 75,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    },

    // Furniture
    {
      id: 10,
      category: "Furniture",
      title: "Modern Sofa",
      price: 499.99,
      rating: 4.9,
      reviews: 80,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    },
    {
      id: 11,
      category: "Furniture",
      title: "Ergonomic Office Chair",
      price: 199.99,
      rating: 5,
      reviews: 65,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600",
    },
    {
      id: 12,
      category: "Furniture",
      title: "Wooden Coffee Table",
      price: 149.99,
      rating: 4.6,
      reviews: 50,
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
    },
    {
      id: 13,
      category: "Furniture",
      title: "Bookshelf",
      price: 179.99,
      rating: 4.8,
      reviews: 60,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },

    // Home
    {
      id: 14,
      category: "Home",
      title: "Table Lamp",
      price: 29.99,
      rating: 4.5,
      reviews: 45,
      image: "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg",
    },
    {
      id: 15,
      category: "Home",
      title: "Stainless Steel Water Bottle",
      price: 34.99,
      rating: 5,
      reviews: 150,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    },
    {
      id: 16,
      category: "Home",
      title: "Wall Clock",
      price: 39.99,
      rating: 4.4,
      reviews: 80,
      image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    },
    {
      id: 17,
      category: "Home",
      title: "Decorative Vase",
      price: 44.99,
      rating: 4.7,
      reviews: 70,
      image:
        "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
    },

    // Sports
    {
      id: 18,
      category: "Sports",
      title: "Football",
      price: 19.99,
      rating: 4.8,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
    },
    {
      id: 19,
      category: "Sports",
      title: "Cricket Bat",
      price: 59.99,
      rating: 4.9,
      reviews: 140,
      image: "https://images.unsplash.com/photo-1624880357913-a8539238245b",
    },
    {
      id: 20,
      category: "Sports",
      title: "Basketball",
      price: 29.99,
      rating: 4.7,
      reviews: 85,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    },

    // Accessories
    {
      id: 21,
      category: "Accessories",
      title: "Leather Wallet",
      price: 24.99,
      rating: 4.8,
      reviews: 120,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    },
    {
      id: 22,
      category: "Accessories",
      title: "Classic Sunglasses",
      price: 49.99,
      rating: 4.7,
      reviews: 100,
      image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg",
    },
    {
      id: 23,
      category: "Accessories",
      title: "Luxury Wrist Watch",
      price: 129.99,
      rating: 4.9,
      reviews: 180,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    },
    {
      id: 24,
      category: "Accessories",
      title: "Travel Backpack",
      price: 69.99,
      rating: 4.8,
      reviews: 135,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    },
    {
      id: 25,
      category: "Accessories",
      title: "Premium Cap",
      price: 19.99,
      rating: 4.5,
      reviews: 75,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b",
    },
  ]);
  const [active, setActive] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isInCart, setIsInCart] = useState(null);
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const savedUser = JSON.parse(localStorage.getItem("user"));
  if(!savedUser){
    <Login />
  }

  return (
    <div>
      
      {!hideLayout && <Navbar setActive={setActive} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            savedUser ? (
              <Home
                product={product}
                setProduct={setProduct}
                setActive={setActive}
                cartItems={cartItems}
                setCartItems={setCartItems}
                isInCart={isInCart}
                setIsInCart={setIsInCart}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/shop"
          element={
            savedUser ? (
              <Shop
                cartItems={cartItems}
                setCartItems={setCartItems}
                setActive={setActive}
                setIsInCart={setIsInCart}
                products={product}
                setProducts={setProduct}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/about" element={savedUser ? <About /> : <Login />} />
      </Routes>
      {!hideLayout && <Footer />}
      <ToastContainer />
      <Cart
        active={active}
        setActive={setActive}
        cartItems={cartItems}
        setCartItems={setCartItems}
        isInCart={isInCart}
        setIsInCart={setIsInCart}
      />
    </div>
  );
};

export default App;
