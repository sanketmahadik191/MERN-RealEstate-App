
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_KEY,
  authDomain: "mern-realestate-4e7c3.firebaseapp.com",
  projectId: "mern-realestate-4e7c3",
  storageBucket: "mern-realestate-4e7c3.appspot.com",
  messagingSenderId: "31118638614",
  appId: "1:31118638614:web:061deb9bb93b15420fbf37"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);