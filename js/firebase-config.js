  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
 
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
  export const auth = getAuth(app);
  