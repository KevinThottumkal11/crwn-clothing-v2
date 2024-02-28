import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // collection key is the name of the collection
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  // console.log(userSnapShot);
  // console.log(userSnapShot.exists());

  // Creating user info if it doesn't exist
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}

export const  createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const  signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);