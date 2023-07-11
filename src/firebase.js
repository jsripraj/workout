import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { 
    GoogleAuthProvider,
    getAuth, 
    signInWithRedirect, 
    getRedirectResult, 
    onAuthStateChanged,
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

export async function auth() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log(`user is signed in. User = ${user}`)
        } else {
            await signInWithRedirect(auth, provider)
                .then((result) => {
                    const user = result.user;
                    console.log(user);
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    console.error(`signInWithRedirect: code: ${errorCode}, msg: ${errorMessage}, email: ${email}`);
                });
        }
    })
}

async function firestore() {
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