import React, { useState } from "react";
import "../style/shop.css";
import { toast } from "react-toastify";

const Shop = ({ cartItems, setCartItems, setActive, setIsInCart, products, setproducts }) => {
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Featured");

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All Categories" || product.category === category;

    return searchMatch && categoryMatch;
  });

  const sortedProducts = [...filteredProducts];
  if (sortBy === "Price: Low to High") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "Price: High to Low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  if (sortBy === "Top Rated") {
    sortedProducts.sort((a, b) => b.reviews - a.reviews);
  }

  

  return (
    <div className="shop-container">
      <h1 className="heading">All Products</h1>
      <p className="sub-heading">{sortedProducts.length} products found</p>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Furniture</option>
          <option>Home</option>
          <option>Accessories</option>
          <option>Sports</option>
        </select>

        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Top Rated</option>
        </select>
      </div>

      <div className="products-grid">
        {sortedProducts.map((product) => (
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
                    setActive(true)
                    toast.success(`${product.title} 🛒`);
                    const isInCart = cartItems.some(
                      (cartItem) => cartItem.id === product.id,
                    );
                    if (isInCart == false) {
                      setCartItems((prevItems) => [
                        ...prevItems,
                        { ...product, quantity: 1 },
                      ]);
                    } else {
                      setIsInCart(true);
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
};

export default Shop;
