import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    doc, 
    setDoc,
} from 'firebase/firestore/lite';
import { 
    GoogleAuthProvider,
    getAuth, 
    signInWithRedirect, 
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCtB516R6TQv2wx-Ikf0-AsMxDlJhJmZw",
  authDomain: "workout-13516.firebaseapp.com",
  projectId: "workout-13516",
  storageBucket: "workout-13516.appspot.com",
  messagingSenderId: "444100980841",
  appId: "1:444100980841:web:f41022017841f08bf1f2f8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export function initAuthObserver(vueUser) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            vueUser.email = user.email;
            vueUser.displayName = user.displayName;
            console.log(`signed in. email: ${user.email}, displayName: ${user.displayName}`);
        } else {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider)
        }
    });
}

export function signout() {
    console.log('signed out')
    signOut(getAuth(app));
}

export async function writeCurrentWorkouts(email, data) {
    try {
        await setDoc(doc(db, email, "current"), {
            workouts: data
        });
    } catch (e) {
        console.error("error setting document: ", e);
    }
}