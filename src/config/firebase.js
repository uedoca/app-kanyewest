import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIgfa7cElXYuHLXMc8IBW-ehFXNMBuOvg",
  authDomain: "applogin-991ed.firebaseapp.com",
  projectId: "applogin-991ed",
  storageBucket: "applogin-991ed.appspot.com",
  messagingSenderId: "803249388310",
  appId: "1:803249388310:web:ec0def1f4e6382fefd2e37",
  measurementId: "G-ESLDSXB47W"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // para disponibilizar a autenticação
export const db = getFirestore(app); // para disponibilizar o banco de dados
