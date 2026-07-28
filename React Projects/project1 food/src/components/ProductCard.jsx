import React from "react";
import "../style/ProductCart.css";

const ProductCard = ({ products, setCartItem }) => {

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-image-wrap">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </div>

          <span className="product-category">{product.category}</span>
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">
            {product.description.split(" ").slice(0, 15).join(" ")}
          </p>

          <div className="product-rating">
            <span className="rating-star">★</span>
            <span className="rating-value">{product.rating.rate}</span>
            <span className="rating-count">({product.rating.count})</span>
          </div>

          <div className="product-footer">
            <span className="product-price">${product.price}</span>
            <button
              onClick={() => {
                setCartItem((prev) => {
                  if(prev == product.findbyId())
                  [...prev, product]
                })
              }}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );

};

export default ProductCard;
