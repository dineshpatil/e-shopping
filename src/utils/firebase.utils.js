import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyASdtjVrzPvgKiOHMFSJQ-Ln7H77LM1c00",
    authDomain: "e-shopping-db.firebaseapp.com",
    projectId: "e-shopping-db",
    storageBucket: "e-shopping-db.appspot.com",
    messagingSenderId: "191361325885",
    appId: "1:191361325885:web:e34a3a53470fcb83f90354",
    measurementId: "G-7B7ENR28LS"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdOn = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdOn,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;