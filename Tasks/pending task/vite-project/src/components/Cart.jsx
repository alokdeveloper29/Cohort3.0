import "../style/cart.css";

export default function Cart({ active, setActive, cartItems }) {
  

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (active) {
    return (
      <div className="cart-panel">
        <div className="cart-header">
          <div>
            <h2>🛍 Cart</h2>
            <span>{cartItems.length} items</span>
          </div>

          <button onClick={() => setActive(false)} className="close-btn">✕</button>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart-info">
                <h4>{item.title}</h4>
                <p>${item.price}</p>

                <div className="qty-box">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => item.price * 2}>+</button>
                </div>
              </div>

              <button className="delete-btn">🗑</button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="total-row">
            <span>Total</span>
            <h2>${total.toFixed(2)}</h2>
          </div>

          <button onClick={() => setActive(false)} className="checkout-btn">Checkout →</button>

          <button className="clear-btn">Clear Cart</button>
        </div>
      </div>
    );
  }
}
