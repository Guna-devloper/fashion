import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Container className="mt-4">
      <h2 className="text-center">❤️ My Wishlist</h2>
      {wishlist.length === 0 ? (
        <h5 className="text-center text-muted">Your wishlist is empty.</h5>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Button variant="danger" onClick={() => removeFromWishlist(product.id)}>❌ Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Wishlist;
