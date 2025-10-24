// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQy-OiO_w5yIO7fPLtpHcu42qHUXNvh9Y",
  authDomain: "avospace-3699c.firebaseapp.com",
  projectId: "avospace-3699c",
  storageBucket: "avospace-3699c.firebasestorage.app",
  messagingSenderId: "583746843337",
  appId: "1:583746843337:web:b5076397da853742e11318",
  measurementId: "G-C72W0F8VLE"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };