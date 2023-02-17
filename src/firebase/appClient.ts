import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAzSovMJgkkTmGfj5plZrZqtYOE4w36e1c",
    authDomain: "movie-app-1dc10.firebaseapp.com",
    projectId: "movie-app-1dc10",
    storageBucket: "movie-app-1dc10.appspot.com",
    messagingSenderId: "453569747749",
    appId: "1:453569747749:web:e525aafebd918c7d7658cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };