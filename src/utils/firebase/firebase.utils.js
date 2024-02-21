import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDxjXKriu7Ep2LAxVGeSIx15UpE4Hd073A",
    authDomain: "crwn-clothing-db-fee96.firebaseapp.com",
    projectId: "crwn-clothing-db-fee96",
    storageBucket: "crwn-clothing-db-fee96.appspot.com",
    messagingSenderId: "307414341564",
    appId: "1:307414341564:web:7cc59ff4d14c0583e4fdb9"
};
  
  // Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
prompt:'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

// For Firestore database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  // Creating user info if it doesn't exist
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}