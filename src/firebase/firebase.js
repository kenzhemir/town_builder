// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgKbWJKCDzu9bxKmeSX0STJXczlk9DGxQ",
  authDomain: "town-builder-e5947.firebaseapp.com",
  projectId: "town-builder-e5947",
  storageBucket: "town-builder-e5947.appspot.com",
  messagingSenderId: "341310377024",
  appId: "1:341310377024:web:2e9991db5e0fe4d49763a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Get a list of cities from your database
export async function getGame(gameId) {
  const gameDoc = doc(db, "games", gameId);
  const gameSnapshot = await getDoc(gameDoc);
  const gameInfo = gameSnapshot.data();
  return gameInfo;
}
