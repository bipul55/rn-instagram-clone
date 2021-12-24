import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAPKJ-2kBXsMzirlZ6a0RveMZL24csjTZU",
  authDomain: "instagram-clone-rn-fbc1d.firebaseapp.com",
  projectId: "instagram-clone-rn-fbc1d",
  storageBucket: "instagram-clone-rn-fbc1d.appspot.com",
  messagingSenderId: "370709317736",
  appId: "1:370709317736:web:775e6f5b48f3fd8cabd3dd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);
// const db = getDatabase();
export { auth, db, storage };
