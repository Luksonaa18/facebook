
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDuCvq61u2Bks9vdv5Ek5zg2zrRJoJCwp8",
  authDomain: "fbclone1-35e75.firebaseapp.com",
  projectId: "fbclone1-35e75",
  storageBucket: "fbclone1-35e75.firebasestorage.app",
  messagingSenderId: "891502932129",
  appId: "1:891502932129:web:2fa7f76a0b39504e0a80e0",
  measurementId: "G-1YXB14RZDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);