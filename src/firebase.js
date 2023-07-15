import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    doc, 
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore/lite';
import { 
    GoogleAuthProvider,
    getAuth, 
    signInWithRedirect, 
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

import * as types from '/src/types.js';

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

export async function getCurrentWorkouts(email, target) {
    if (email) {
        const docRef = doc(db, email, types._docNameCurrent);
        await getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    target.value = docSnap.data().workouts;
                } else {
                    console.log("No current workouts!");
                }
            })
            .catch((err) => {
                console.error('get doc: ', err);
            })
    }
}

export async function getHistoricalWorkouts(email, target) {
    if (email) {
        const docRef = doc(db, email, types._docNameHistory);
        await getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    target.value = docSnap.data().workouts;
                } else {
                    console.log("No historical workouts!");
                }
            })
            .catch((err) => {
                console.error('get doc: ', err);
            })
    }
}

export async function writeCurrentWorkouts(email, data) {
    try {
        await setDoc(doc(db, email, types._docNameCurrent), {
            workouts: data
        });
    } catch (e) {
        console.error("set doc: ", e);
    }
}

export async function writeWorkoutToHistory(email, workout) {
    const docRef = doc(db, email, types._docNameHistory);
    try {
        await updateDoc(docRef, {workouts: arrayUnion(workout)});
    } catch (err) {
        console.log(`in error handling`);
        await getDoc(docRef)
            .then(async (docSnap) => {
                if (docSnap.exists()) {
                    throw new Error("existing doc: ", err);
                } else {
                    console.log('setting doc');
                    await setDoc(docRef, {workouts: []})
                }
            })
            .then(async () => {await updateDoc(docRef, {workouts: arrayUnion(workout)})})
            .catch((err) => {console.error("update history doc with array union: ", err)})
    }
}

export function signout() {
    console.log('signed out')
    signOut(getAuth(app));
}
