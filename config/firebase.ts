import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHu-dF7uDrAPJBE_07nFWP6YIG96eCHUQ",
  authDomain: "gourmethaven-733cd.firebaseapp.com",
  projectId: "gourmethaven-733cd",
  storageBucket: "gourmethaven-733cd.firebasestorage.app",
  messagingSenderId: "966502873020",
  appId: "1:966502873020:web:fc461cd7f672f9fdf09db9",
  measurementId: "G-VZVPX16GWW"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
