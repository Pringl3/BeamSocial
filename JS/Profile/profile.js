// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCS48UUIZw9_VatWf3a_JtGZaxrlyCJZq8",
    authDomain: "beam-54300.firebaseapp.com",
    projectId: "beam-54300",
    storageBucket: "beam-54300.firebasestorage.app",
    messagingSenderId: "355750973806",
    appId: "1:355750973806:web:78c7bfe2e9d16d039ef17f",
    measurementId: "G-K30CMJ2036"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        const currentUser = auth.currentUser;
        const url = new URL(window.location.href);
        url.searchParams.set('username', currentUser.displayName);
        window.history.replaceState({}, '', url);

        const profile_username = user.displayName || 'User';
        document.title = `${profile_username}'s Profile`;

        console.log(url.href); // Log the updated URL
    } else {
        console.log('No user is signed in');
        // Optionally, redirect to the login page
        window.location.href = 'register_signin.html';
    }
});