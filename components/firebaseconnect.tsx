import firebase from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCSKX5ZhyUoYsBRU-3E8lPK2zrRn3AjiDc",
    authDomain: "yttracker-16f96.firebaseapp.com",
    projectId: "yttracker-16f96",
    storageBucket: "yttracker-16f96.appspot.com",
    messagingSenderId: "172557285605",
    appId: "1:172557285605:web:46fffa606373f6cedfbc0c",
    measurementId: "G-JKR2H0KE6D"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;