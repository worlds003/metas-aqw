import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC5JO0TndQiMREXKEMzXE3h3UuunRaVPPg",
    authDomain: "metas-aqw.firebaseapp.com",
    projectId: "metas-aqw",
    storageBucket: "metas-aqw.firebasestorage.app",
    messagingSenderId: "366374848500",
    appId: "1:366374848500:web:cd313a2b95e344bedddba1",
    measurementId: "G-W5DNRL8REZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
