import React from "react";
import "../style/home.css";
import { useNavigate } from "react-router";

export default function Home({ userName = "Alok" }) {
  return (
    <div className="home-page">
      <div className="page-body">
        <section className="hero-section">
          <div className="hero-left">
            <span className="hero-tag">GOOD EVENING 👋</span>
            <h1 className="hero-headline">
              Welcome back, <span className="accent">{userName}!</span>
            </h1>
            <p className="hero-subtext">
              Discover today's picks — hand-curated products across electronics,
              fashion, and more.
            </p>
            <div className="hero-actions">
              <button className="primary-btn">Shop Now →</button>
              <button className="secondary-btn">View All Products</button>
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
            <span className="view-all">View All →</span>
          </div>

          <div className="category-grid">
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
              <span className="see-all">See all →</span>
            </div>

            <div className="list-body">
              <div className="product-row">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100"
                  alt="Headphones"
                  className="product-thumb"
                />
                <span className="product-price">$99.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>

              <div className="product-row">
                <img
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100"
                  alt="Smart Watch"
                  className="product-thumb"
                />
                <span className="product-price">$299.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>

              <div className="product-row">
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100"
                  alt="T Shirt"
                  className="product-thumb"
                />
                <span className="product-price">$24.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>

              <div className="product-row">
                <img
                  src="https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Office Chair"
                  className="product-thumb"
                />
                <span className="product-price">$199.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>

              <div className="product-row">
                <img
                  src="https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Table Lamp"
                  className="product-thumb"
                />
                <span className="product-price">$34.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>
            </div>
          </div>

          {/* New Arrivals */}
          <div className="list-card">
            <div className="list-header">
              <span className="list-title">
                <span className="list-icon">⚡</span> New Arrivals
              </span>
              <span className="see-all">See all →</span>
            </div>

            <div className="list-body">
              <div className="product-row">
                <img
                  src="https://images.unsplash.com/photo-1527814050087-3793815479db?w=100"
                  alt="Gaming Mouse"
                  className="product-thumb"
                />
                <span className="product-price">$39.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>

              <div className="product-row">
                <img
                  src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100"
                  alt="Keyboard"
                  className="product-thumb"
                />
                <span className="product-price">$89.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>

              <div className="product-row">
                <img
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=100"
                  alt="Denim Jacket"
                  className="product-thumb"
                />
                <span className="product-price">$69.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>

              <div className="product-row">
                <img
                  src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Sunglasses"
                  className="product-thumb"
                />
                <span className="product-price">$49.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>

              <div className="product-row">
                <img
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100"
                  alt="Backpack"
                  className="product-thumb"
                />
                <span className="product-price">$69.99</span>
                <button className="cart-icon-btn">🛍</button>
              </div>
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
