
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// Log to help debug environment variable loading for Firebase
// This log will only appear in your server console when the module is loaded.
if (typeof window === 'undefined') { 
  console.log(
    '[Firebase Setup Server Log] Checking NEXT_PUBLIC_FIREBASE_API_KEY:', 
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY 
      ? `Present (length: ${process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length})` 
      : 'NOT SET or undefined'
  );
  // You might want to log other critical Firebase env vars similarly for debugging:
  // console.log('[Firebase Setup Server Log] Checking NEXT_PUBLIC_FIREBASE_PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? `Present` : 'NOT SET or undefined');
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { app, db, auth };
