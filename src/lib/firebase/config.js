// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBXfn-ePOO6eJNCCpFZVDnicH8nBpvtHD8',
  authDomain: 'order-luch.firebaseapp.com',
  databaseURL: 'https://order-luch-default-rtdb.firebaseio.com',
  projectId: 'order-luch',
  storageBucket: 'order-luch.appspot.com',
  messagingSenderId: '937829689191',
  appId: '1:937829689191:web:e5bda635a1f91da64171c2',
  measurementId: 'G-1W64YTH01G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// connectAuthEmulator(auth, 'http://127.0.0.1:9099');

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// connectFirestoreEmulator(db, '127.0.0.1', 8080);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app, 'gs://order-luch.appspot.com');
// connectStorageEmulator(storage, '127.0.0.1', 9199);

export { app, analytics, db, auth, storage };
