// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8EJWxJdxidolw55PHuF6EY7YDyOmz2Fs",
  authDomain: "auth-development-f1c64.firebaseapp.com",
  projectId: "auth-development-f1c64",
  storageBucket: "auth-development-f1c64.appspot.com",
  messagingSenderId: "347200366632",
  appId: "1:347200366632:web:ad72d364f5e3cccd14ad1d",
  measurementId: "G-TEEVNR7619",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// initialize firebase authentication and get a reference to a service
const auth = getAuth(app);
const storage = getStorage(app);

export default { auth, storage };
