import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAuKnFWgeXLr9Q4oCyriFJvCHPEJVlsXjw",
    authDomain: "react-1-58cc8.firebaseapp.com",
    projectId: "react-1-58cc8",
    storageBucket: "react-1-58cc8.appspot.com",
    messagingSenderId: "454060300410",
    appId: "1:454060300410:web:e116c6946ea37144fa43c3"
};
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export{db,auth,provider};