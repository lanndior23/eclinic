// js/auth.js
import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Helper to show error
function showError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = message;
}

// Login function
export async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) return showError("Please enter email and password");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful:", userCredential.user.email);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login failed:", error.message);
    showError(error.message);
  }
}

// Register function
export async function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) return showError("Please enter email and password");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Registered successfully:", userCredential.user.email);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Registration failed:", error.message);
    showError(error.message);
  }
}

// Make functions accessible from HTML
window.login = login;
window.register = register;
