import { db, auth } from './firebase-config.js';
import {
  collection, addDoc, serverTimestamp,
  query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadMessages();
  } else {
    window.location.href = 'index.html';
  }
});

const loadMessages = () => {
  const chatRef = collection(db, "chats");
  const q = query(chatRef, orderBy("timestamp"));

  onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = '';
    snapshot.forEach((doc) => {
      const data = doc.data();
      const sender = data.sender === currentUser.email ? "You" : data.sender;
      const msgClass = sender === "You" ? "your-msg" : "doctor-msg";

      const msgDiv = document.createElement("div");
      msgDiv.className = `chat-message ${msgClass}`;
      msgDiv.innerHTML = `<strong>${sender}:</strong> ${data.message}`;
      chatBox.appendChild(msgDiv);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
};

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  await addDoc(collection(db, "chats"), {
    sender: currentUser.email,
    message,
    timestamp: serverTimestamp()
  });

  // Simulated doctor response
  setTimeout(() => {
    addDoc(collection(db, "chats"), {
      sender: "Dr. Bot",
      message: "Thank you for your message. A doctor will respond shortly.",
      timestamp: serverTimestamp()
    });
  }, 1000);

  chatInput.value = "";
});
