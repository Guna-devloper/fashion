import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Container, Form, Button, Table } from "react-bootstrap";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "", description: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "products"), newProduct);
    alert("Product added!");
    setNewProduct({ name: "", price: "", image: "", description: "" });
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    alert("Product deleted!");
  };

  return (
    <Container className="mt-5">
      <h2>Admin Panel - Manage Products</h2>

      <Form onSubmit={handleAddProduct} className="mb-4">
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} required />
        </Form.Group>
        <Button type="submit" className="mt-3">Add Product</Button>
      </Form>

      <h3>Product List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td><img src={product.image} alt={product.name} width="50" /></td>
              <td><Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPanel;
