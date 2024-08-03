// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgizqF8am_Ol-i35g3BJp-J9mXmUyed3I",
  authDomain: "edited-pantry-tracker-2.firebaseapp.com",
  projectId: "edited-pantry-tracker-2",
  storageBucket: "edited-pantry-tracker-2.appspot.com",
  messagingSenderId: "766361007562",
  appId: "1:766361007562:web:abf1d33e1feab2a6500b33",
  measurementId: "G-YJBF49LT5T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };
