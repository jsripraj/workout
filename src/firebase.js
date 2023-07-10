import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCtB516R6TQv2wx-Ikf0-AsMxDlJhJmZw",
  authDomain: "workout-13516.firebaseapp.com",
  projectId: "workout-13516",
  storageBucket: "workout-13516.appspot.com",
  messagingSenderId: "444100980841",
  appId: "1:444100980841:web:f41022017841f08bf1f2f8"
};

export async function firestore() {
    // Create Firebase app
    const app = initializeApp(firebaseConfig);

    // Authenticate
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithRedirect(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            console.log(`error: code: ${errorCode}, msg: ${errorMessage}, email: ${email}`);
        })

    // Create Firestore instance
    const db = getFirestore(app);

    try {
    console.log('trying to add doc');
    const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace", 
        born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}