// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB76d1tZQvWNxCb1cwEeG_Sb1K7kZRMNY8",
  authDomain: "fashion-com.firebaseapp.com",
  projectId: "fashion-com",
  storageBucket: "fashion-com.appspot.com", // ✅ Fixed storageBucket
  messagingSenderId: "393621036748",
  appId: "1:393621036748:web:09361253f775f8ffa06c69",
  measurementId: "G-ZBWJ31GBMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export Firebase services
export { app, auth, db, analytics };
