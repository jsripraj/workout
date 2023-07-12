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

// import { User } from '/src/types.js'

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
            console.log(`user is signed in`);
            // console.log(`user = ${JSON.stringify(user)}`);
            



            // await auth.updateCurrentUser(user)
            //     .catch(err => {
            //         console.error(`update current user: ${err}`);
            //     });
            vueUser.email = user.email;
            console.log(`email: ${user.email}`);
            vueUser.displayName = user.displayName;
            console.log(`displayName: ${user.displayName}`);
        } else {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider)
            // const result = await getRedirectResult(auth);
            // if (result) {
            // } else {
            //     console.error(`get user data from redirect result`)
            // }
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
    });
}

// Returns null if the current user has not yet been initialized by the observer
// export function getCurrentUser(user, timeout) {
    // let elapsed = 0;
    // while (elapsed < timeout) {
    //     console.log(`elapsed = ${elapsed}`);
    //     setTimeout(() => {
    //         console.log("waiting for current user to be initialized");
    //     }, 1000);
    //     if (auth.currentUser === null) {
    //         elapsed += 50;
    //     } else {
    //         return new User(auth.currentUser.email, auth.currentUser.displayName);
    //     }
    // }
    // console.log("timed out");
    // return null;

//     getCurrentUserPromise(timeout)
//         .then((user) => {
//             return user;
//         });
// }

// function getCurrentUserPromise(timeout) {
//     const start = Date.now();
//     return new Promise(waitForUser);
//     function waitForUser(resolve, reject) {
//         if (auth.currentUser) {
//             resolve(new User(auth.currentUser.email, auth.currentUser.displayName));
//         } else if (timeout && (Date.now() - start) >= timeout) {
//             reject(new Error("timeout"));
//         } else {
//             setTimeout(waitForUser.bind(this, resolve, reject), 50);
//         }
//     }
// }


// export function auth() {


//     console.log(`auth.currentUser = ${JSON.stringify(auth.currentUser)}`);
//     if (auth.currentUser) {
//         const user = new User(auth.currentUser.email, auth.currentUser.displayName);
//         console.log(`got auth.currentUser: user = ${user}`);
//     }
    // } else {
    //     console.error(`get auth's currentUser:\n auth = ${JSON.stringify(auth)}\n\ncurrentUser = ${auth.currentUser}`);
    // }
// }

export function signout() {
    console.log('signing out user')
    signOut(getAuth(app));
}

export async function writeWorkouts(email, data) {
    try {
        console.log('trying to add doc');
        // const docRef = await addDoc(collection(db, "test"), {
        //     first: "Kat",
        //     last: "Wong", 
        //     born: 1996,
        // });
        // console.log("Document written with ID: ", docRef.id);
        await setDoc(doc(db, email, "workouts"), {
            workouts: data
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}