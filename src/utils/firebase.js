// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkakO9LiVNLPVR6-h6vPjv9Gs6yHT5IN4",
  authDomain: "netflix-gpt-ab63a.firebaseapp.com",
  projectId: "netflix-gpt-ab63a",
  storageBucket: "netflix-gpt-ab63a.firebasestorage.app",
  messagingSenderId: "284912815149",
  appId: "1:284912815149:web:318d1889f8697f1eaf7ca4",
  measurementId: "G-DVN408E374"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);