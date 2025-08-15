import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe4yvjiQEG4OL8oEj6n7d0zv_TdG4QYR8",
  authDomain: "eclinic-86417.firebaseapp.com",
  projectId: "eclinic-86417",
  storageBucket: "eclinic-86417.firebasestorage.app",
  messagingSenderId: "740126833680",
  appId: "1:740126833680:web:df7b96e063ce8384fd1e95",
  measurementId: "G-2S31XEPJV5"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);