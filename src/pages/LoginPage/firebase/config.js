import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqYebQCg6q20Njz3eRB2jKOlmqYXgdOlI",
  authDomain: "elibrary-bfe78.firebaseapp.com",
  projectId: "elibrary-bfe78",
  storageBucket: "elibrary-bfe78.appspot.com",
  messagingSenderId: "647318925605",
  appId: "1:647318925605:web:e284eb8861f7900009eacc",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);