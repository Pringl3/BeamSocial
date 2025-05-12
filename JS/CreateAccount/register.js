// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


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
const db = getFirestore(app);

const form = document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  console.log('Register button clicked');

  // Inputs
  const username = document.getElementById('username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const photoURL = document.getElementById('profile-img-url').value.trim() || '/Images/profile_default.jpg'; // Use default if empty

  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Photo URL:', photoURL);

  try {
    console.log('Creating user with email and password...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User created:', user);

    // Update user profile
    console.log('Updating user profile...');
    await updateProfile(user, {
      displayName: username,
      photoURL: photoURL
    });
    console.log('User profile updated');

    // Add user to Firestore
    console.log('Adding user to Firestore...');
    await setDoc(doc(db, "Users", user.uid), {
      name: username,
      email: email,
      photoURL: photoURL
    });
    await setDoc(doc(db, "Users", user.uid, "AI_Chats", "defaultMessage"), {
      usermessage: "Hello BeamAI!",
      sender: user.displayName,
      timestamp: new Date()
    });
    console.log('User added to Firestore');

    alert('Account created and profile updated!');
    window.location.href = 'index.html';
    form.reset();

  } catch (error) {
    console.error('Error:', error.code, error.message);
    alert(error.message);
  }
});