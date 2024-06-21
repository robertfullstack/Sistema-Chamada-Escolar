import firebase from 'firebase';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDzkmxBhcs65qeH0xHo6Pt7fj89p32TbGc",
    authDomain: "sistemachamadaescolar.firebaseapp.com",
    projectId: "sistemachamadaescolar",
    storageBucket: "sistemachamadaescolar.appspot.com",
    messagingSenderId: "473204392936",
    appId: "1:473204392936:web:cca594aa144932526a1a5d"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export { db, auth, storage, functions };