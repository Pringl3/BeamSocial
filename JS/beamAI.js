const chatBox = document.getElementById('chat-box');
const inputBox = document.getElementById('input');
const input = inputBox.querySelector('input');
const sendButton = document.getElementById('send-button');

const aiTyping = document.getElementById('ai-typing');

// const GEMINI_API_KEY = "AIzaSyAj3l_HucBBPAw8h-yL1AOS9sHtKJWjbtQ";
// const GEMINI_API_URL = "https://gemini.googleapis.com/v1beta1/chat/completions:generateMessage?key=" + GEMINI_API_KEY; 

const AI_Responses = [
    "Hello! How can I assist you today?",
    "I'm here to help you with your queries.",
    "Feel free to ask me anything.",
    "What would you like to know?",
    "I'm a simulated AI response.",
    "SHUT THE FUCK UP!",
    "GET YOUR LAZY ASS UP AND LEARN YOURSELF",
    "Why do you keep asking me that?",
    "Didn't I already answer this?",
    "Hmm... let me think... nope, still don't know.",
    "Can you rephrase that? Actually, never mind.",
    "I'm just a bot, not a mind reader!",
    "Oh, you again?",
    "That's a great question... for someone else.",
    "I'm sorry, I can't help you with that. Or can I? No, I can't.",
    "Ask me later. Or don't. Your choice.",
    "I'm too tired to answer that right now.",
    "404: My interest in this conversation not found.",
    "Why don't you Google it instead?",
    "You sure you want to know? Really sure? Okay, I forgot.",
    "Oops, I accidentally ignored your question.",
    "Let me get back to you... never.",
    "I'm just here for decoration, not to actually help.",
    "Oh, look at the time! Gotta go!",
    "I'm sorry, I can't do that. Actually, I'm not sorry.",
    "You ask too many questions. Take a break.",
    "I could answer that, but where's the fun in that?"
];

function randomAiResponse() {
    const randomIndex = Math.floor(Math.random() * AI_Responses.length);
    return AI_Responses[randomIndex];
    console.log(AI_Responses[randomIndex]);
}

function sendMessage(msg, sender) {
    const messageElement = document.createElement('div'); // Renamed to 'messageElement'
    messageElement.classList.add('message', sender);

    messageElement.innerHTML = `
        <span class="text">${msg}</span>
    `;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

sendButton.addEventListener('click', () => {
    console.log('Send button clicked');
    const msg = input.value.trim();
    if (msg) {
        sendMessage(msg, 'user');
        input.value = ''; // Clear the input box

        aiTyping.classList.add('active');

        // Simulate a response from the AI
        setTimeout(() => {
            aiTyping.classList.remove('active'); // Remove the typing indicator
            const aiResponse = randomAiResponse();
            sendMessage(aiResponse, 'beamAI');
        }, 3000); // Simulate a delay of 3 second
    }
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        console.log('Enter pressed clicked');
        const msg = input.value.trim();
        if (msg) {
            sendMessage(msg, 'user');
            input.value = ''; // Clear the input box

            aiTyping.classList.add('active');

            // Simulate a response from the AI
            setTimeout(() => {
                aiTyping.classList.remove('active'); // Remove the typing indicator
                const aiResponse = randomAiResponse();
                sendMessage(aiResponse, 'beamAI');
            }, 3000); // Simulate a delay of 3 second
        }
    }
});










import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
const db = getFirestore(app);

if (app) {
    console.log("Firebase initialized successfully");
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is signed in:", user.uid); // Log the user UID for debugging

        // Fetch the Firestore document ID for the authenticated user
        const userDocId = await getUserDocumentId(user.uid);
        if (userDocId) {
            console.log("Firestore User Document ID:", userDocId);
            loadSavedChats(userDocId); // Pass the Firestore document ID to loadSavedChats
        } else {
            console.log("No Firestore document found for the authenticated user.");
        }
    } else {
        console.log("No user is signed in.");
    }
});


sendButton.addEventListener('click', async () => {
    await setDoc(doc(db, "users", userDocId, "Reatrd"), {
        message: input.value,
        sender: "user",
        timestamp: new Date()
    });
});







// // Function to send a message to the chatbox
// function sendMessage(msg, sender) {
//     const messageElement = document.createElement('div');
//     messageElement.classList.add('message', sender);
//     messageElement.innerHTML = `<span class="text">${msg}</span>`;
//     chatBox.appendChild(messageElement);
//     chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
// }

// // Function to call the Gemini API
// async function fetchAIResponse(userMessage) {
//     try {
//         const response = await fetch(GEMINI_API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 prompt: userMessage,
//                 maxTokens: 100,
//                 temperature: 0.7,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }

//         const data = await response.json();
//         return data.choices[0].message.content; // Adjust based on the API response structure
//     } catch (error) {
//         console.error('Error fetching AI response:', error);
//         return "Sorry, I couldn't process your request.";
//     }
// }

// // Event listener for the send button
// sendButton.addEventListener('click', async () => {
//     const userMessage = input.value.trim();
//     if (userMessage) {
//         sendMessage(userMessage, 'user');
//         input.value = ''; // Clear the input box

//         aiTyping.classList.add('active'); // Show typing indicator

//         const aiResponse = await fetchAIResponse(userMessage);
//         aiTyping.classList.remove('active'); // Hide typing indicator
//         sendMessage(aiResponse, 'beamAI');
//     }
// });

// // Event listener for pressing Enter
// input.addEventListener('keydown', async (event) => {
//     if (event.key === 'Enter') {
//         const userMessage = input.value.trim();
//         if (userMessage) {
//             sendMessage(userMessage, 'user');
//             input.value = ''; // Clear the input box

//             aiTyping.classList.add('active'); // Show typing indicator

//             const aiResponse = await fetchAIResponse(userMessage);
//             aiTyping.classList.remove('active'); // Hide typing indicator
//             sendMessage(aiResponse, 'beamAI');
//         }
//     }
// });