import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Form, Button, InputGroup } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext"; // ✅ Import Cart Context
import "../styles/Shop.css";

const API_URL = "https://fakestoreapi.com/products";

const Shop = () => {
  console.log("🚀 Shop Component Loaded!");

  const { addToCart } = useCart(); // ✅ Fix: Ensure this is correctly accessed

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("📡 Fetching products from API...");
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products!");

        const productList = await response.json();
        console.log("✅ Products fetched:", productList);

        // ✅ Remove "electronics" category products
        const filteredProductList = productList.filter(product => product.category !== "electronics");

        setProducts(filteredProductList);
        setFilteredProducts(filteredProductList);

        let extractedCategories = filteredProductList.map((product) => product.category);
        extractedCategories = [...new Set(extractedCategories)];

        // ✅ Remove "electronics" from the categories list
        const requiredCategories = ["All", "men's clothing", "women's clothing", "jewelery"];
        setCategories([...new Set([...requiredCategories, ...extractedCategories])]);

      } catch (err) {
        console.error("❌ Fetch Error:", err.message);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        let url = API_URL;

        if (selectedCategory !== "All") {
          url = `${API_URL}/category/${selectedCategory}`;
        }

        console.log(`📡 Fetching filtered products from: ${url}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch filtered products!");

        let filteredData = await response.json();

        // ✅ Remove electronics category from filtering
        filteredData = filteredData.filter(product => product.category !== "electronics");

        if (searchQuery.trim() !== "") {
          filteredData = filteredData.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        console.log("✅ Filtered Products:", filteredData);
        setFilteredProducts(filteredData);
      } catch (err) {
        console.error("❌ Fetch Error:", err.message);
        setError("Failed to fetch filtered products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory, searchQuery]);

  // ✅ Function to add to wishlist and store in local storage
  const addToWishlist = (product) => {
    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <Container className="shop-container">
      <h2 className="text-center">🛍️ Explore Our Collection</h2>

      {/* ✅ Search & Filter Section */}
      <Row className="mb-4">
        <Col xs={12} className="mb-3">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="🔍 Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="dark">Search</Button>
          </InputGroup>
        </Col>

        <Col xs={12} className="mb-3">
          <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* ✅ Loader & Error Messages */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading products...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {/* ✅ Responsive Product Grid */}
      {!loading && !error && filteredProducts.length > 0 ? (
        <Row className="mt-4">
          {filteredProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} addToCart={addToCart} />
            </Col>
          ))}
        </Row>
      ) : (
        !loading &&
        !error && (
          <Col className="text-center">
            <Alert variant="warning">
              No products found. Try adjusting the search or category filter. 🔎
            </Alert>
          </Col>
        )
      )}
    </Container>
  );
};

export default Shop;
