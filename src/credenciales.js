// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_m_kP1hG43qmABO4qTjiJLG1yH6YFbBs",
  authDomain: "swtesis-e0343.firebaseapp.com",
  databaseURL: "https://swtesis-e0343-default-rtdb.firebaseio.com",
  projectId: "swtesis-e0343",
  storageBucket: "swtesis-e0343.appspot.com",
  messagingSenderId: "673554968019",
  appId: "1:673554968019:web:51ce06d76d996c727bd326",
  measurementId: "G-1VQZR402JL"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase