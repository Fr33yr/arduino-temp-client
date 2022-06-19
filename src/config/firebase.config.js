import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBirv-OkAsea5NN9_Ryzrk8uJFlZECFHB0",
    authDomain: "arduino-temp-79cca.firebaseapp.com",
    databaseURL: "https://arduino-temp-79cca-default-rtdb.firebaseio.com",
    projectId: "arduino-temp-79cca",
    storageBucket: "arduino-temp-79cca.appspot.com",
    messagingSenderId: "502629281681",
    appId: "1:502629281681:web:920dc5a7699ced93d9f430",
    measurementId: "G-R31229N9EF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore()

export { db, auth, app }