import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css"; // ✅ External CSS for better responsiveness

const Cart = () => {
  const { cart, removeFromCart, setCart } = useCart();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [setCart]);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-info">
                <strong className="cart-name">{item.name}</strong>
                <p className="cart-price">${item.price}</p>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>
                Remove ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
