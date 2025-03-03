import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css"; // ✅ External CSS for better responsiveness

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // ✅ Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">🛒 Checkout</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">No items in cart.</p>
      ) : (
        <>
          <ul className="checkout-list">
            {cart.map((item) => (
              <li key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-image" />
                <div className="checkout-info">
                  <strong className="checkout-name">{item.name}</strong>
                  <p className="checkout-price">${item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* ✅ Display Total Price */}
          <h4 className="checkout-total">Total: ${totalPrice.toFixed(2)}</h4>

          {/* ✅ Proceed to Pay Button */}
          <button className="checkout-button" onClick={() => navigate("/payment")}>
            Proceed to Pay 💳
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
