
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// --- CRITICAL: Firebase Initialization Server Log ---
// This log will ONLY appear in your server console (terminal) when the Next.js app starts or reloads server-side modules.
// It helps verify if your .env.local file is being loaded and if the Firebase environment variables are accessible.
// If you see "NOT SET or undefined" for any of these, it means:
// 1. Your .env.local file might be in the wrong location (it MUST be in the project root).
// 2. You might have typos in the environment variable names in .env.local (they MUST start with NEXT_PUBLIC_).
// 3. You have NOT RESTARTED your Next.js development server after creating or modifying .env.local.
if (typeof window === 'undefined') { // Ensures this only runs on the server
  console.log('--- Firebase Initialization Server Log ---');
  const criticalEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];
  criticalEnvVars.forEach(varName => {
    const value = process.env[varName];
    console.log(
      `[Firebase Setup] ${varName}: ${value ? `Present (length: ${value.length})` : 'NOT SET or undefined'}`
    );
  });
  console.log('------------------------------------------');
}

// --- ATTENTION: Firebase Configuration ---
// The "auth/invalid-api-key" error almost always means there's an issue with the values below,
// especially NEXT_PUBLIC_FIREBASE_API_KEY.
//
// PLEASE VERIFY THE FOLLOWING:
// 1. Your .env.local file is in the project root directory.
// 2. You have correctly copied ALL these values from your Firebase project settings.
//    (Firebase Console > Project settings (gear icon) > General tab > Your apps > Web app > Firebase SDK snippet > Config)
// 3. There are NO typos or extra spaces in these values in your .env.local file.
// 4. You have RESTARTED your Next.js development server (npm run dev) after making changes to .env.local.
// 5. Firebase Authentication is ENABLED in your Firebase project (Firebase Console > Build > Authentication > Get started).
// 6. Check for API key restrictions in Google Cloud Console (APIs & Services > Credentials) that might prevent usage.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional, often not critical for auth/firestore
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app); // This line will throw "auth/invalid-api-key" if apiKey is wrong

export { app, db, auth };
