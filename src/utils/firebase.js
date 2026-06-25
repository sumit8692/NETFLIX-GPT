// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXUWGT-Zut3FwesXkzyyABXWUhgDzjTwg",
  authDomain: "netflixgpt-6e824.firebaseapp.com",
  projectId: "netflixgpt-6e824",
  storageBucket: "netflixgpt-6e824.firebasestorage.app",
  messagingSenderId: "483308395493",
  appId: "1:483308395493:web:b347a649e3f2fd6edced0c",
  measurementId: "G-9ZJLS0YS9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();