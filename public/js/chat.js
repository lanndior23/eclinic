import { db, auth } from './firebase-config.js';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    listenToMessages();
  } else {
    window.location.href = 'index.html';
  }
});

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();

  if (message === "") return;

  await addDoc(collection(db, "chats"), {
    uid: currentUser.uid,
    sender: "user",
    message,
    timestamp: serverTimestamp()
  });

  // Optional: Simulate doctor reply
  setTimeout(() => {
    addDoc(collection(db, "chats"), {
      uid: currentUser.uid,
      sender: "doctor",
      message: "Thank you for your message. A doctor will respond shortly.",
      timestamp: serverTimestamp()
    });
  }, 1500);

  chatInput.value = "";
});

function listenToMessages() {
  const q = query(
    collection(db, "chats"),
    orderBy("timestamp", "asc")
  );

  onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.uid === currentUser.uid) {
        const div = document.createElement("div");
        div.classList.add("chat-message");

        if (data.sender === "user") {
          div.classList.add("your-msg");
        } else {
          div.classList.add("doctor-msg");
        }

        div.textContent = data.message;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
      }
    });
  });
}
