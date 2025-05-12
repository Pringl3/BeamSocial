import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const signinBtn = document.getElementById('signinBtn');
signinBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Sign In button clicked');

  // inputs
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  console.log('Email:', email);
  console.log('Password:', password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('User signed in:', user);
      alert('Logging in to account...');

      // const currentUser = auth.currentUser;
      // const url = 'profile.html';
      // const params = new URLSearchParams(url.search);
      // params.append('username', currentUser.displayName);
      window.location.href = "index.html";

      // const url = `https://example.com/user/${currentUser.displayName}`;
      //   updateDoc(doc(db, "Users", user.uid), {
      //     ThisIsYou: true,
      //     status: true
      //   }).then(() => {
      //     console.log("User status updated to online.");
      //     window.location.href = 'profile.html';
      //   }).catch((error) => {
      //     console.error("Error updating user status:", error);
      //   });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error:', errorCode, errorMessage);
      alert(errorMessage);
    });
});