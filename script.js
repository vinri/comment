// Firebase Configuration (replace with your Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyD2LRja-8a0YkVYSY9CNZx5DtjZwVXf9nA",
  authDomain: "commentsectionproject.firebaseapp.com",
  projectId: "commentsectionproject",
  storageBucket: "commentsectionproject.firebasestorage.app",
  messagingSenderId: "248416694028",
  appId: "1:248416694028:web:ec839574762683d4b06329",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig); // Using the global Firebase object
const db = firebase.firestore(app); // Access Firestore

// DOM Elements
const commentForm = document.getElementById("comment-form");
const commentsList = document.getElementById("comments-list");

// Fetch and render comments
const fetchComments = () => {
  const commentsRef = db.collection("comments"); // Use Firestore collection
  commentsRef.onSnapshot((snapshot) => {
    commentsList.innerHTML = "";
    snapshot.forEach((doc) => {
      const comment = doc.data();
      const listItem = document.createElement("li");
      listItem.textContent = `${comment.name}: ${comment.comment}`;
      commentsList.appendChild(listItem);
    });
  });
};

// Add a new comment
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  if (name && comment) {
    try {
      await db.collection("comments").add({ name, comment });
      commentForm.reset();
    } catch (err) {
      console.error("Error adding comment: ", err);
    }
  }
});

// Load comments on page load
fetchComments();
