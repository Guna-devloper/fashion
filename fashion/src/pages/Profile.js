import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Container, Card, Button } from "react-bootstrap";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h3>Profile</h3>
        {userData ? (
          <>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {auth.currentUser.email}</p>
            <Button variant="danger" onClick={() => auth.signOut()}>Logout</Button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </Container>
  );
};

export default Profile;
