// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };


//---------------------- Authentication Functions --------------------


export const registerUser = async (email: string, password: string, username: string) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(response.user, {displayName: username});

  //Force token refresh so onIdTokenChanged fires
  await response.user.getIdToken(true);

  const uid = response.user.uid

  // Create a new document using the uid as the document id
  const data = {
    username: username,
  }

  const userRef = doc(db, "Users", response.user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(doc(db, "Users", uid), data)
  }

  return response;
};

export const verifyUser = () => {
  return sendEmailVerification(auth.currentUser!);
}

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const logoutUser = () => {
  return auth.signOut();
}


//---------------------- Firestore Database Functions --------------------