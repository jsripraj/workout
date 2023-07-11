import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { 
    GoogleAuthProvider,
    getAuth, 
    signInWithRedirect, 
    getRedirectResult,
    onAuthStateChanged,
} from "firebase/auth";

import { User } from '/src/types.js'

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
    const user = new User();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log(`user is signed in. User = ${user}`)
        } else {
            await signInWithRedirect(auth, provider);
            const result = await getRedirectResult(auth);
            if (result) {
                user.email = result.user.providerData.email;
                console.log(`email: ${user.email}`);
                user.displayName = result.user.providerData.displayName;
                console.log(`displayName: ${user.displayName}`);
            } else {
                console.error(`get user data from redirect result`)
            }
                // .then((result) => {
                //     const user = result.user;
                //     console.log(user);
                // }).catch((error) => {
                //     const errorCode = error.code;
                //     const errorMessage = error.message;
                //     const email = error.customData.email;
                //     console.error(`signInWithRedirect: code: ${errorCode}, msg: ${errorMessage}, email: ${email}`);
                // });
        }
    })
}

export function newFirestore() {
    const db = getFirestore(app);
    return db;

}

export async function write(db) {
    try {
        console.log('trying to add doc');
        const docRef = await addDoc(collection(db, "test"), {
            first: "Chase",
            last: "Sripraj", 
            born: 1998,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}