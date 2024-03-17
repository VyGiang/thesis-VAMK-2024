// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-9E19JB3A8DBZrhNKvj_9QNf8CubvYEE",
  authDomain: "home-assistant-11da9.firebaseapp.com",
  projectId: "home-assistant-11da9",
  storageBucket: "home-assistant-11da9.appspot.com",
  messagingSenderId: "707086638420",
  appId: "1:707086638420:web:0ce42a63f95e004a337cc1",
  measurementId: "G-QYQ73N2T2X",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
