import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
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

const feed = document.getElementById('feed-posts');
const postBtn = document.getElementById('postBtn');

const formPfp = document.getElementById('comment_form-pfp');
const fInput = document.getElementById('feed-content');
const fileInput = document.getElementById('upload-file');
const filePreview = document.getElementById('file-preview');

let currentUser = null;
const likedPosts = new Set(); // Set to keep track of liked posts

// Check if the user is signed in
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user);
        currentUser = user; // Store the user object in a global variable

        const signinLink = document.getElementById('SignInLink');
        signinLink.style.display = 'none';

        const pfp = document.getElementById('profilePic');
        pfp.style.display = 'block';
        pfp.style.width = '60px';
        pfp.style.height = '60px';
        pfp.style.borderRadius = '50%';
        pfp.style.border = '2px solid #000';
        pfp.style.cursor = 'pointer';
        pfp.src = user.photoURL;

        const profile_pic = document.getElementById('profile-pic');
        const profile_name = document.getElementById('profile-name');
        profile_pic.src = user.photoURL;
        profile_name.textContent = user.displayName;

    } else {
        console.log('User is signed out');
        window.location.href = 'register_signin.html';
    }
});

// Sign out
const signOutBtn = document.getElementById('logout');
signOutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('User signed out');
        alert('You have been signed out successfully.');
        window.location.href = 'register_signin.html';
    }).catch((error) => {
        console.error(error);
    });
});

fileInput.addEventListener('change', () => {
    filePreview.innerHTML = ''; // Clear previous previews
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileURL = URL.createObjectURL(file);
        let previewElement;
        if (file.type.startsWith('image/')) {
            previewElement = document.createElement('img');
            previewElement.src = fileURL;
            previewElement.style.maxWidth = '150px';
            previewElement.style.height = 'auto';
            previewElement.style.marginTop = '10px';
        } else if (file.type.startsWith('video/')) {
            previewElement = document.createElement('video');
            previewElement.controls = true;
            previewElement.style.maxWidth = '100%';
            previewElement.style.height = 'auto';
            previewElement.style.marginTop = '10px';
            const source = document.createElement('source');
            source.src = fileURL;
            source.type = file.type;
            previewElement.appendChild(source);
        }
        filePreview.appendChild(previewElement);
    }
});

postBtn.addEventListener('click', () => {
    if (!currentUser) {
        alert('You must be signed in to post.');
        return;
    }

    const post = document.createElement('div');
    post.classList.add('post');

    if (fInput.value === '' && fileInput.files.length === 0) {
        alert('Please enter some content or upload a file before posting.');
        return;
    };

    // Upload files to the post
    let filesHTML = '';
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileURL = URL.createObjectURL(file);
        if (file.type.startsWith('image/')) {
            filesHTML += `<img src="${fileURL}" alt="${file.name}" style="max-width: 150px; height: auto; margin-top: 10px;">`;
        } else if (file.type.startsWith('video/')) {
            filesHTML += `<video controls style="max-width: 100%; height: auto; margin-top: 10px;">
                            <source src="${fileURL}" type="${file.type}">
                            Your browser does not support the video tag.
                          </video>`;
        }
    }

    const postId = `${currentUser.displayName.replace(/\s+/g, '_')}-${Date.now()}`; // Generate a unique ID for the post

    post.innerHTML = `
        <div class="row">
            <img src="${currentUser.photoURL}" alt="default_profile">
            <div class="post-info">
                <h3>${currentUser.displayName}</h3>
                <span id="time-ago" data-timestamp="${Math.floor(Date.now() / 1000)}"></span>
            </div>
            <i class='bx bx-dots-horizontal-rounded' id="post-menu"></i>
            <div id="postMenu">
                <ul>
                    <li>Edit</li>
                    <li>Delete</li>
                </ul>
            </div>
        </div>
        <p>${fInput.value}</p>
        ${filesHTML}
        <div class="row">
            <button id="likeBtn-${postId}"><i class='bx bx-like'></i></button>
            <div class="buttons">
                <button><i class='bx bx-comment' id="commentBtn"></i> Comment </button>
                <button><i class='bx bx-share' id="shareBtn"></i> Share </button>
            </div>
        </div>
    `;

    updateTimes();

    // Insert the new post at the top of the feed
    if (feed.firstChild) {
        feed.insertBefore(post, feed.firstChild);
    } else {
        feed.appendChild(post);
    }

    // Add the post to the database
    setDoc(doc(db, 'Feed', postId), {
        user: currentUser.displayName,
        message: fInput.value,
        files: filesHTML,
        timestamp: Math.floor(Date.now() / 1000),
        profile: currentUser.photoURL
    }).then(() => {
        console.log('Document successfully written!');
    }).catch((error) => {
        console.error('Error writing document: ', error);
    });

    // Clear the input fields after posting
    fInput.value = '';
    fileInput.value = '';
    filePreview.innerHTML = ''; // Clear the file preview

    let likes = 0;

    // const likeBtn = post.querySelector(`#likeBtn-${postId}`);
    // likeBtn.addEventListener('click', () => {
    //     if (likedPosts.has(postId)) {
    //         likes--;
    //         likedPosts.delete(postId);
    //         likeBtn.innerHTML = `<i class='bx bx-like'></i> ${likes}`;
    //         updateDoc(doc(db, 'Feed', postId), {
    //             likes: likes,
    //         }).then(() => {
    //             console.log('Likes updated:', likes);
    //         }).catch((error) => {
    //             console.error('Error updating likes: ', error);
    //         });
    //     } else {
    //         likes++;
    //         likedPosts.add(postId);
    //         likeBtn.innerHTML = `<i class='bx bx-like'></i> ${likes}`;
    //         updateDoc(doc(db, 'Feed', postId), {
    //             likes: likes,
    //         }).then(() => {
    //             console.log('Likes updated:', likes);
    //         }).catch((error) => {
    //             console.error('Error updating likes: ', error);
    //         });
    //     }
    // });

    let comments = 0;
});

// Fetch and display posts from Firestore
async function fetchPosts() {
    const querySnapshot = await getDocs(collection(db, 'Feed'));
    querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const post = document.createElement('div');
        post.classList.add('post');

        post.innerHTML = `
            <div class="row">
                <img src="${postData.profile}" alt="default_profile">
                <div class="post-info">
                    <h3>${postData.user}</h3>
                    <span id="time-ago" data-timestamp="${postData.timestamp}"></span>
                </div>
                <i class='bx bx-dots-horizontal-rounded' id="post-menu"></i>
            </div>
            <p>${postData.message}</p>
            ${postData.files}
            <div class="row">
                <button id="likeBtn-${doc.id}"><i class='bx bx-like'></i> ${postData.likes || 0}</button>
                <div class="buttons">
                    <button><i class='bx bx-comment' id="commentBtn"></i> Comment </button>
                    <button><i class='bx bx-share' id="shareBtn"></i> Share </button>
                </div>
            </div>
        `;

        const likeBtn = post.querySelector(`#likeBtn-${doc.id}`);
        likeBtn.addEventListener('click', () => {
            if (likedPosts.has(doc.id)) {
                postData.likes--;
                likedPosts.delete(doc.id);
                likeBtn.innerHTML = `<i class='bx bx-like'></i> ${postData.likes}`;
                updateDoc(doc(db, 'Feed', doc.id), {
                    likes: postData.likes,
                }).then(() => {
                    console.log('Likes updated:', postData.likes);
                }).catch((error) => {
                    console.error('Error updating likes: ', error);
                });
            } else {
                postData.likes++;
                likedPosts.add(doc.id);
                likeBtn.innerHTML = `<i class='bx bx-like'></i> ${postData.likes}`;
                updateDoc(doc(db, 'Feed', doc.id), {
                    likes: postData.likes,
                }).then(() => {
                    console.log('Likes updated:', postData.likes);
                }).catch((error) => {
                    console.error('Error updating likes: ', error);
                });
            }
        });

        // Insert the post at the top of the feed
        if (feed.firstChild) {
            feed.insertBefore(post, feed.firstChild);
        } else {
            feed.appendChild(post);
        }
    });

    updateTimes();
}

fetchPosts();
// Time ago
function timeAgo(timestamp) {
    const now = new Date();
    const timeDiff = now - new Date(timestamp * 1000); // Convert to milliseconds

    const seconds = Math.floor(timeDiff / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} days ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} weeks ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(days / 365);
    return `${years} years ago`;
}

function updateTimes() {
    document.querySelectorAll('#time-ago').forEach(el => {
        const timestamp = el.getAttribute('data-timestamp');
        if (timestamp) {
            el.textContent = timeAgo(Number(timestamp));
        }
    });
}

updateTimes();

setInterval(updateTimes, 1000);

document.addEventListener('DOMContentLoaded', function () {
    const timeElements = document.querySelectorAll('#time');

    timeElements.forEach(element => {
        const timestamp = element.getAttribute('data-timestamp');
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        const now = new Date();
        const timeDifference = now - date;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            element.textContent = 'Today';
        } else if (daysDifference === 1) {
            element.textContent = 'Yesterday';
        } else {
            element.textContent = `${daysDifference} days ago`;
        }
    });
});

// const postMenuBtn = document.getElementById('post-menu');
// const postMenu = document.getElementById('postMenu');
// postMenuBtn.addEventListener('click', () => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//         alert('You must be signed in to access this feature.');
//         return;
//     } else {
//         postMenu.classList.toggle('show');
//         postMenu.id = 'postMenu open';
//     }
// });