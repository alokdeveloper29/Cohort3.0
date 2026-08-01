import React, { useState } from "react";
import "../style/home.css";
import { useNavigate } from "react-router";
import Login from "./Login";
import { toast } from "react-toastify";

const savedUser = JSON.parse(localStorage.getItem("user"));

export default function Home({
  product,
  setActive,
  cartItems,
  setCartItems,
  isInCart,
  setIsInCart,
}) {
  const [productDetail, setProductDetail] = useState(false);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "GOOD MORNING 🌅";
    } else if (hour < 17) {
      return "GOOD AFTERNOON ☀️";
    } else if (hour < 21) {
      return "GOOD EVENING 🌆";
    } else {
      return "GOOD NIGHT 🌙";
    }
  };

  const topRated = [
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
      id: 6,
      category: "Clothing",
      title: "Oversized Hoodie",
      price: 49.99,
      rating: 4.8,
      reviews: 150,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
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
  ];

  const newArrivals = [
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
      id: 18,
      category: "Sports",
      title: "Football",
      price: 19.99,
      rating: 4.8,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
    },
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
  ];

  const relatedProducts = [
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
  ];

  const incressQuantity = (id) => {
    setCartItems((prev) => {
      return prev.map((val) => {
        return val.id == id ? { ...val, quantity: val.quantity + 1 } : val;
      });
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  if (productDetail) {
    return (
      <div className="product-detail">
        <a href="/shop" className="back-link">
          ← Back to Shop
        </a>

        <div className="product-container">
          <div className="product-image">
            <span className="badge">{currentProduct.category}</span>

            <img src={currentProduct.image} alt="error" />
          </div>

          <div className="product-info">
            <p className="category">{currentProduct.category}</p>
            <h1>{currentProduct.title}</h1>
            <div className="rating">
              ⭐⭐⭐⭐⭐ <span>({currentProduct.reviews})</span>
            </div>

            <hr />

            <h2 className="price">${currentProduct.price}</h2>

            <p className="description">
              A great pick from our home collection. Carefully selected for
              quality and everyday value, backed by 203+ happy customers.
            </p>

            <div className="cart-section">
              <div className="quantity-box">
                <button
                  onClick={() => {
                    decreaseQuantity(currentProduct.id);
                    if (quantity > 1) {
                      setQuantity((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => {
                    incressQuantity(currentProduct.id);
                    setQuantity((prev) => prev + 1);
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  setActive(true);

                  const isInCart = cartItems.some(
                    (cartItem) => cartItem.id === currentProduct.id,
                  );

                  if (!isInCart) {
                    setCartItems((prevItems) => [
                      ...prevItems,
                      { ...currentProduct, quantity: quantity },
                    ]);
                  }
                }}
                className="cart-btn"
              >
                🛒 Add to Cart
              </button>
            </div>

            <hr />

            <div className="features">
              <p>⚡ Fast Delivery — same-day on select items</p>
              <p>🛡️ Secure Payments — 100% encrypted checkout</p>
              <p>🏷️ Best Prices — price-match guarantee</p>
            </div>
          </div>
        </div>

        <h2 className="relatedProducts">Related Products</h2>
        <div className="products-grid">
          {relatedProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="image-box">
                <span className="badge">{product.category}</span>

                <img src={product.image} alt={product.title} />
              </div>

              <div className="content">
                <p className="category">{product.category}</p>

                <h3>{product.title}</h3>

                <div className="rating">⭐⭐⭐⭐⭐ ({product.reviews})</div>

                <hr />

                <div className="bottom">
                  <h2>${product.price}</h2>

                  <button
                    onClick={() => {
                      setActive(true);
                      const isInCart = cartItems.some(
                        (cartItem) => cartItem.id === product.id,
                      );
                      if (isInCart == false) {
                        setCartItems((prevItems) => [
                          ...prevItems,
                          { ...product, quantity: 1 },
                        ]);
                      }
                    }}
                    className="add-btn"
                  >
                    🛒 Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="page-body">
        <section className="hero-section">
          <div className="hero-left">
            <span className="hero-tag">{getGreeting()}</span>
            <h1 className="hero-headline">
              Welcome back, <span className="accent">{savedUser.username}!</span>
            </h1>
            <p className="hero-subtext">
              Discover today's picks — hand-curated products across electronics,
              fashion, and more.
            </p>
            <div className="hero-actions">
              <button onClick={() => navigate("/shop")} className="primary-btn">
                Shop Now →
              </button>
              <button
                onClick={() => navigate("/shop")}
                className="secondary-btn"
              >
                View All Products
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-card highlight">
              <span className="hero-card-value">50+</span>
              <span className="hero-card-label">Products Available</span>
            </div>
            <div className="hero-card">
              <span className="hero-card-value">Free</span>
              <span className="hero-card-label">Delivery on ₹999+</span>
            </div>
          </div>
        </section>

        <section className="quick-stats">
          <div className="quick-stat-card">
            <span className="quick-stat-icon">📦</span>
            <div>
              <h4>0</h4>
              <p className="quick-stat-label">Cart Items</p>
              <p className="quick-stat-sub">In your bag</p>
            </div>
          </div>

          <div className="quick-stat-card">
            <span className="quick-stat-icon">🧾</span>
            <div>
              <h4>$0.00</h4>
              <p className="quick-stat-label">Cart Value</p>
              <p className="quick-stat-sub">Ready to checkout</p>
            </div>
          </div>

          <div className="quick-stat-card">
            <span className="quick-stat-icon">⭐</span>
            <div>
              <h4>5</h4>
              <p className="quick-stat-label">Top Products</p>
              <p className="quick-stat-sub">Highly rated</p>
            </div>
          </div>

          <div className="quick-stat-card">
            <span className="quick-stat-icon">🏷</span>
            <div>
              <h4>6</h4>
              <p className="quick-stat-label">Categories</p>
              <p className="quick-stat-sub">To explore</p>
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <span onClick={() => navigate("/shop")} className="view-all">
              View All →
            </span>
          </div>

          <div onClick={() => navigate("/shop")} className="category-grid">
            <div className="category-card">
              <span className="category-icon">💻</span>
              <h3>Electronics</h3>
              <span className="category-count">15 items</span>
            </div>

            <div className="category-card">
              <span className="category-icon">👕</span>
              <h3>Clothing</h3>
              <span className="category-count">3 items</span>
            </div>

            <div className="category-card">
              <span className="category-icon">🪑</span>
              <h3>Furniture</h3>
              <span className="category-count">4 items</span>
            </div>

            <div className="category-card">
              <span className="category-icon">🏠</span>
              <h3>Home</h3>
              <span className="category-count">15 items</span>
            </div>

            <div className="category-card">
              <span className="category-icon">⌚</span>
              <h3>Accessories</h3>
              <span className="category-count">6 items</span>
            </div>

            <div className="category-card">
              <span className="category-icon">⚽</span>
              <h3>Sports</h3>
              <span className="category-count">7 items</span>
            </div>
          </div>
        </section>

        <section className="lists-section">
          {/* Top Rated */}
          <div className="list-card">
            <div className="list-header">
              <span className="list-title">
                <span className="list-icon">⭐</span> Top Rated
              </span>
              <span onClick={() => setProductDetail(true)} className="see-all">
                See all →
              </span>
            </div>

            <div className="list-body">
              {topRated.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setProductDetail(true);
                    setCurrentProduct(product);
                  }}
                  className="product-row"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-thumb"
                  />
                  <span className="product-price">${product.price}</span>
                  <button className="cart-icon-btn">🛍️</button>
                </div>
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="list-card">
            <div className="list-header">
              <span className="list-title">
                <span className="list-icon">⚡</span> New Arrivals
              </span>
              <span onClick={() => setProductDeatail(true)} className="see-all">
                See all →
              </span>
            </div>

            <div className="list-body">
              {newArrivals.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setProductDetail(true);
                    setCurrentProduct(product);
                  }}
                  className="product-row"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-thumb"
                  />
                  <span className="product-price">${product.price}</span>
                  <button className="cart-icon-btn">🛍️</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <div>
              <h4>Fast Delivery</h4>
              <p>Same-day on select items</p>
            </div>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🛡</span>
            <div>
              <h4>Secure Payments</h4>
              <p>100% encrypted checkout</p>
            </div>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🏷</span>
            <div>
              <h4>Best Prices</h4>
              <p>Price-match guarantee</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
