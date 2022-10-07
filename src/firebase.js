import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCg0npXQ-e73vs5xUHQUJCIkB8Nh6XzWk4",
  authDomain: "reactnetflixclone-a04fb.firebaseapp.com",
  projectId: "reactnetflixclone-a04fb",
  storageBucket: "reactnetflixclone-a04fb.appspot.com",
  messagingSenderId: "309772249287",
  appId: "1:309772249287:web:bc0822471ef0982a5b36e2",
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
