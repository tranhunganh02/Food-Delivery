// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getDatabase} from 'firebase/database'
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAQ3bi-4waxZGaSldJvks00rVq7mKK7rQ0",
//   authDomain: "food-delivery-daf8c.firebaseapp.com",
//   databaseURL: "https://food-delivery-daf8c-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "food-delivery-daf8c",
//   storageBucket: "food-delivery-daf8c.appspot.com",
//   messagingSenderId: "596005918238",
//   appId: "1:596005918238:web:9b7d157e42ca21fc50c00f",
//   measurementId: "G-R1G6XK8G2X"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCk64K4ylCJzxoSQLilaSIapiqNw74teNg",
  authDomain: "neon-obelisk-356015.firebaseapp.com",
  projectId: "neon-obelisk-356015",
  storageBucket: "neon-obelisk-356015.appspot.com",
  messagingSenderId: "683397752239",
  appId: "1:683397752239:web:e79afcc6299bd4fdfa7b5a",
  measurementId: "G-38728FRN6D"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const dbStore = getFirestore(app);

const dbRealTime = getDatabase(app, 'https://food-delivery-daf8c-default-rtdb.asia-southeast1.firebasedatabase.app/');

//const analytics = getAnalytics(app);
export  {auth,storage,dbStore,dbRealTime}

