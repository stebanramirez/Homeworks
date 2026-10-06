import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3VYr4IFUwSoxetf5QVl9qCnG1vjSloHI",
  authDomain: "task-app-89e90.firebaseapp.com",
  projectId: "task-app-89e90",
  storageBucket: "task-app-89e90.firebasestorage.app",
  messagingSenderId: "22888534438",
  appId: "1:22888534438:web:f3ac42e8829623b6a83f67"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
