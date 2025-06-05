// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdw-UD3Nz0K6XnLDR06ZyMJ6Y1l6OIMCk",
  authDomain: "proyecto-iwfirebase.firebaseapp.com",
  projectId: "proyecto-iwfirebase",
  storageBucket: "proyecto-iwfirebase.firebasestorage.app",
  messagingSenderId: "249668556739",
  appId: "1:249668556739:web:d5fba3f202eb3c626b4f76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const FirebaseFirestore = getFirestore(app);

export {
    app, FirebaseFirestore
}
