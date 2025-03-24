// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9keYXeQMQbs9OqfZLSBQd9yC1v_en830",
    authDomain: "first-project-7d5cd.firebaseapp.com",
    projectId: "first-project-7d5cd",
    storageBucket: "first-project-7d5cd.firebasestorage.app",
    messagingSenderId: "510745042677",
    appId: "1:510745042677:web:1918f5a552b7f9329aafbc",
    measurementId: "G-1JCMGFLHJN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { auth, provider }