import { useState } from "react";
import "../style/cart.css";
import { toast } from "react-toastify";

export default function Cart({
  active,
  setActive,
  cartItems,
  setCartItems,
  isInCart,
}) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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

  if (active) {
    return (
      <div className="cart-panel">
        <div className="cart-header">
          <div>
            <h2>🛒 Cart</h2>
            <span>{cartItems.length} items</span>
          </div>

          <button onClick={() => setActive(false)} className="close-btn">
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart-info">
                <h4>{item.title}</h4>
                <p>${(item.quantity * item.price).toFixed(2)}</p>

                <div className="qty-box">
                  <button
                    onClick={() => {
                      decreaseQuantity(item.id);
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      incressQuantity(item.id);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setCartItems((prev) =>
                    prev.filter((cartItem) => cartItem.id !== item.id),
                  );
                }}
                className="delete-btn"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="total-row">
            <span>Total</span>
            <h2>${total.toFixed(2)}</h2>
          </div>

          <button
            onClick={() => {
              setActive(false);
              window.confirm("Order placed successfully.");
              toast.success("Order placed successfully.");
              setCartItems([]);
            }}
            className="checkout-btn"
          >
            Checkout →
          </button>

          <button
            onClick={() => {
              const isConfirmed = window.confirm(
                "Are you sure you want to delete all items from your cart?",
              );

              if (isConfirmed) {
                toast.success("Deleted all items from cart");
                setCartItems([]);
              }
            }}
            className="clear-btn"
          >
            Clear Cart
          </button>
        </div>
      </div>
    );
  }
}
