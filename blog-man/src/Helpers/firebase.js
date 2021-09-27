import { initializeApp } from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDzuBAPSMcuvafeqcnzX-gIncfcqiOGn-U",
  authDomain: "blog-man-87ec7.firebaseapp.com",
  projectId: "blog-man-87ec7",
  storageBucket: "blog-man-87ec7.appspot.com",
  messagingSenderId: "1097101258777",
  appId: "1:1097101258777:web:6ba4e2c32dafb4456e3a88"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;