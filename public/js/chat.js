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

// Wait for auth user
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    listenToMessages();
  } else {
    window.location.href = 'index.html';
  }
});

// Send message
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

  // Fake doctor response after 2 sec
  setTimeout(() => {
    addDoc(collection(db, "chats"), {
      uid: currentUser.uid,
      sender: "doctor",
      message: "Thanks, we’ll get back to you shortly.",
      timestamp: serverTimestamp()
    });
  }, 2000);

  chatInput.value = "";
});

// Listen for messages
function listenToMessages() {
  const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));

  onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.uid === currentUser.uid) {
        const div = document.createElement("div");
        div.classList.add("chat-message");

        let type;
        if (data.sender === "user") {
          type = "your-msg";
          div.classList.add("your-msg");
          div.style.alignSelf = "flex-end";
        } else {
          type = "doctor-msg";
          div.classList.add("doctor-msg");
          div.style.alignSelf = "flex-start";
        }

        // Get time string
        let time = "";
        if (data.timestamp && data.timestamp.toDate) {
          const now = data.timestamp.toDate();
          time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        div.innerHTML = `
          <span>${data.message}</span>
          ${type === 'your-msg' && time ? `<div class="status">Sent &#10003; ${time}</div>` : ''}
        `;
        chatBox.appendChild(div);
      }
    });

    chatBox.scrollTop = chatBox.scrollHeight;
  });
}
