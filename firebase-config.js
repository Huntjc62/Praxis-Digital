// PRAXIS Firebase configuration
// Firebase Web App: praxis-363bf
// Uses the Firebase modular browser SDK.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKKc0yqhyThLfVf9hjkruzkisTEOJbocw",
  authDomain: "praxis-363bf.firebaseapp.com",
  projectId: "praxis-363bf",
  storageBucket: "praxis-363bf.firebasestorage.app",
  messagingSenderId: "133130255370",
  appId: "1:133130255370:web:73304dbe295a35b20cf3f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialise the services used by PRAXIS
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, firebaseConfig };
