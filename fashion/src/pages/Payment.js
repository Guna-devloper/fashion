import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Payment.css"; // ✅ External CSS for responsiveness

const Payment = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // ✅ Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handlePayment = () => {
    alert("Payment Successful! ✅");
    navigate("/home"); // Redirect to home page after payment
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">💳 Payment</h2>

      <h4 className="payment-total">Total Amount: ${totalPrice.toFixed(2)}</h4>

      {/* ✅ Payment Methods */}
      <div className="payment-methods">
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="credit" defaultChecked />
          Credit Card 💳
        </label>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="paypal" />
          PayPal 🏦
        </label>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="upi" />
          UPI / Net Banking 📱
        </label>
      </div>

      {/* ✅ Pay Now Button */}
      <button className="payment-button" onClick={handlePayment}>
        Pay Now ✅
      </button>
    </div>
  );
};

export default Payment;
