import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import.meta.env.VITE_API_KEY

const firebaseConfig = {
  apiKey: "AIzaSyADhCN-l1Rrpz6Tu9A26G5TZdIxWo65PTw",
  authDomain: "directpay-80768.firebaseapp.com",
  projectId: "directpay-80768",
  storageBucket: "directpay-80768.appspot.com",
  messagingSenderId: "166603567497",
  appId: "1:166603567497:web:1a216a4a33feba960a7158",
  measurementId: "G-VGTJ7Z0RH6"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
