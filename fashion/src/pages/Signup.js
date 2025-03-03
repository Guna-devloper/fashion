import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import "../styles/Signup.css";  // ✅ Import the separate CSS file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
      });

      navigate("/"); // Redirect after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 shadow-lg signup-card">
          <h2 className="text-center mb-4">Create an Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
          <div className="login-link">
            <p>Already have an account? <a href="/">Login</a></p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
