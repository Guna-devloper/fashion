import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image, Card, Carousel, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const FAKE_STORE_API_URL = "https://fakestoreapi.com/products"; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(FAKE_STORE_API_URL);
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Categorize products correctly
  const menFashion = products.find(product => product.category === "men's clothing");
  const womenFashion = products.find(product => product.category === "women's clothing");
  const accessories = products.find(product => product.category === "jewelery");

  return (
    <Container fluid className="home-container text-center">
      {/* Hero Section with Dynamic Carousel */}
      <Row className="hero-section align-items-center text-white">
        <Col md={6} className="text-center text-md-start">
          <h1 className="fw-bold">Welcome to Fashion Store</h1>
          <p className="lead">Your one-stop destination for trendy and stylish fashion!</p>
          <Link to="/shop">
            <Button variant="dark" size="lg" className="mt-3">
              Shop Now
            </Button>
          </Link>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          {loading && (
            <div className="text-center">
              <Spinner animation="border" variant="light" />
              <p>Loading images...</p>
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && !error && products.length > 0 && (
            <Carousel className="home-carousel">
              {products.slice(0, 5).map((product, index) => (
                <Carousel.Item key={index}>
                  <div className="carousel-image-container">
                    <Image src={product.image} alt="Fashion Slide" fluid className="carousel-image" />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>
      </Row>

      {/* Featured Categories with Correct Matching Images */}
      <Container className="my-5">
        <h2 className="text-center">Explore Our Collections</h2>
        <Row className="mt-4">
          {[
            { title: "Men's Fashion", product: menFashion },
            { title: "Women's Fashion", product: womenFashion },
            { title: "Accessories", product: accessories },
          ].map(({ title, product }, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="d-flex justify-content-center mb-4">
              <Card className="category-card">
                {product ? (
                  <Card.Img variant="top" src={product.image} alt={title} />
                ) : (
                  <Spinner animation="grow" variant="secondary" />
                )}
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Link to="/shop">
                    <Button variant="outline-dark">Explore</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
