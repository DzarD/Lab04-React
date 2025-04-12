


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBZ9RnYS7NWSqFjgEATtQYNc1oXS8R-WY",
  authDomain: "lab04-react-s2.firebaseapp.com",
  projectId: "lab04-react-s2",
  storageBucket: "lab04-react-s2.firebasestorage.app",
  messagingSenderId: "871422661517",
  appId: "1:871422661517:web:72ddabe438fb4fbdb1e3c4"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
