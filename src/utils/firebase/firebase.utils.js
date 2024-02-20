import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
prompt:'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);