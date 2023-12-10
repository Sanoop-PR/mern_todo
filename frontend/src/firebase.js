// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEtRLBqaFTWma3ax1G8MdYJpV7m8w10MA",
  authDomain: "mern-auth-491b4.firebaseapp.com",
  projectId: "mern-auth-491b4",
  storageBucket: "mern-auth-491b4.appspot.com",
  messagingSenderId: "261585039021",
  appId: "1:261585039021:web:128c8458a8a529a4756024"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
