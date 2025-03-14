import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Container, Card, Button } from "react-bootstrap";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        setProduct(productSnap.data());
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "25rem" }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
          <Button variant="success">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
