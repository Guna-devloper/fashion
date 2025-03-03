import React from "react";
import { Navbar, Nav, Badge, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // ✅ Import useCart

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { cart } = useCart(); // ✅ Correctly get cart
  // ❌ Do NOT use `setCart` if not needed here

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Fashion Store</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/shop">Shop</Nav.Link>

          {/* ✅ Cart Section */}
          <Nav.Link as={Link} to="/cart">
            <FaShoppingCart /> Cart <Badge bg="danger">{cart.length}</Badge>
          </Nav.Link>

          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Button variant="danger" className="ms-2" onClick={handleLogout}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
