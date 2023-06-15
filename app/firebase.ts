// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYJGOJPDIM04_ilQ9U3Or2sKKhHuV5298",
    authDomain: "expense-tracker-b6257.firebaseapp.com",
    projectId: "expense-tracker-b6257",
    storageBucket: "expense-tracker-b6257.appspot.com",
    messagingSenderId: "611298112875",
    appId: "1:611298112875:web:5a595304163cb125c6082e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app)