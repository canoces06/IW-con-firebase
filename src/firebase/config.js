
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


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

//comentario para subir cambios en esta carpeta al repositorio