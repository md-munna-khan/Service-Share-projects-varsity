// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyBMMrT4EEffcaYza0HqMePtIHld-4chcgg",
//   authDomain: "harvard-university-cf289.firebaseapp.com",
//   projectId: "harvard-university-cf289",
//   storageBucket: "harvard-university-cf289.firebasestorage.app",
//   messagingSenderId: "880702147811",
//   appId: "1:880702147811:web:d54b964d422ced7a3789d6"
apiKey: import.meta.env.VITE_apiKey,
authDomain: import.meta.env.VITE_authDomain,
projectId: import.meta.env.VITE_projectId,
storageBucket: import.meta.env.VITE_storageBucket,
messagingSenderId: import.meta.env.VITE_messagingSenderId,
appId: import.meta.env.VITE_appId,
};

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export  const auth = getAuth(app);