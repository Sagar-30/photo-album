import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXtBGoKSTKiMV_YXgArLiU8qQo4d39ZCc",
  authDomain: "expense-management-764b6.firebaseapp.com",
  projectId: "expense-management-764b6",
  storageBucket: "expense-management-764b6.appspot.com",
  messagingSenderId: "1056185128428",
  appId: "1:1056185128428:web:a7613673a3fc7231d09cc9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);