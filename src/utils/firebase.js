// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGIcPJ8eSr2gpLid-NQJp2-pe2ybja_Ao",
  authDomain: "webflix-1159d.firebaseapp.com",
  projectId: "webflix-1159d",
  storageBucket: "webflix-1159d.firebasestorage.app",
  messagingSenderId: "698845498267",
  appId: "1:698845498267:web:9cb0b756fa3192f2baaf3e",
  measurementId: "G-2K6M9JFZ3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();