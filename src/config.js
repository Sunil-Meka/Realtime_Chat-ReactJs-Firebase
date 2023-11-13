// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCA-6Wvh71Wb2jEw-hRpwCrrPaC9oBjIWI",
    authDomain: "project-007-e82c9.firebaseapp.com",
    projectId: "project-007-e82c9",
    storageBucket: "project-007-e82c9.appspot.com",
    messagingSenderId: "774526553775",
    appId: "1:774526553775:web:9bc126dfd028dab51ece5a"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { auth, firestore };
