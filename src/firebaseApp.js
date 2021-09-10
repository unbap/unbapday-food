// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2sVg5JAFFMqYi6BwpcECfdC-Wx1UDvPY",
  authDomain: "unbapday-food.firebaseapp.com",
  projectId: "unbapday-food",
  storageBucket: "unbapday-food.appspot.com",
  messagingSenderId: "347716106143",
  appId: "1:347716106143:web:7820e5fee12264b2ed6faa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default app;
