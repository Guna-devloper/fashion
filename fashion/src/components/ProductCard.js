import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleAddToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Save to local storage
  };

  const handleBuyNow = () => {
    handleAddToCart(); // ✅ Add to cart before checkout
    navigate("/checkout"); // ✅ Redirect to checkout page
  };

  return (
    <Card className="product-card">
      <Card.Img variant="top" src={product.image} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>

        <div className="d-flex justify-content-between">
          <Button variant="dark" onClick={handleAddToCart}>
            <FaShoppingCart /> Add to Cart
          </Button>
          <Button variant="success" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
