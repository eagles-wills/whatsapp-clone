// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
	apiKey: "AIzaSyDsg1Z5Y4UClrcAbvYPXqEEoSSpFlZjzl4",
	authDomain: "socials-clone-9718c.firebaseapp.com",
	projectId: "socials-clone-9718c",
	storageBucket: "socials-clone-9718c.appspot.com",
	messagingSenderId: "88863881428",
	appId: "1:88863881428:web:d8100a5d6d24a7054ca341",
	measurementId: "G-BL83BF44QX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
