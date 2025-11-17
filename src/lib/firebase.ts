// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQy-OiO_w5yIO7fPLtpHcu42qHUXNvh9Y",
  authDomain: "avospace-3699c.firebaseapp.com",
  projectId: "avospace-3699c",
  storageBucket: "avospace-3699c.firebasestorage.app",
  messagingSenderId: "583746843337",
  appId: "1:583746843337:web:b5076397da853742e11318",
  measurementId: "G-C72W0F8VLE"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
