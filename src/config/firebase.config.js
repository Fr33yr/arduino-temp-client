import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    //Firebase Config goes here
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore()

export { db, auth, app }
