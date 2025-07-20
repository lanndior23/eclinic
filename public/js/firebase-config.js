import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
 
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA1-f_FvWAd1Howxu2tEE2hv6uL25jPaHI",
    authDomain: "eclinic-gh.firebaseapp.com",
    projectId: "eclinic-gh",
    storageBucket: "eclinic-gh.firebasestorage.app",
    messagingSenderId: "327690766921",
    appId: "1:327690766921:web:b78b74e98fd8298be8cd98"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);