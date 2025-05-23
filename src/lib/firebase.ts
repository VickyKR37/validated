
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// --- CRITICAL: Firebase Initialization Server Log ---
// This log will ONLY appear in your server console (terminal) when the Next.js app starts or reloads server-side modules.
// It helps verify if your .env.local file is being loaded and if the Firebase environment variables are accessible.
//
// **IF YOU SEE "NOT SET or undefined" FOR ANY OF THESE, IT MEANS:**
// 1. Your .env.local file might be in the wrong location (it MUST be in the project root, same level as package.json).
// 2. You might have typos in the environment variable names in .env.local (they MUST start with NEXT_PUBLIC_).
// 3. **YOU HAVE NOT RESTARTED YOUR NEXT.JS DEVELOPMENT SERVER AFTER CREATING/MODIFYING .ENV.LOCAL. THIS IS THE MOST COMMON CAUSE.**
//
// ** ===> ACTION: RESTART YOUR `npm run dev` SERVER NOW IF YOU'VE MADE ANY CHANGES TO `.env.local` <=== **
//
if (typeof window === 'undefined') { // Ensures this only runs on the server
  console.log('\n--- Firebase Initialization Server Log ---');
  const criticalEnvVars: string[] = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
    // 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', // Measurement ID is optional for core Firebase services
  ];
  criticalEnvVars.forEach(varName => {
    const value = process.env[varName];
    let statusMessage = '!!!!!!!! NOT SET or undefined !!!!!!!! -- THIS IS LIKELY THE PROBLEM!';
    if (value) {
      if (varName === 'NEXT_PUBLIC_FIREBASE_API_KEY') {
        statusMessage = `Present (length: ${value.length}) - Verify this key and length are correct.`;
      } else {
        statusMessage = `Present - Value: ${value}`;
      }
    }
    console.log(`[Firebase Setup] ${varName}: ${statusMessage}`);
  });
  console.log('------------------------------------------');
  console.log('If NEXT_PUBLIC_FIREBASE_API_KEY (or other critical vars) are "NOT SET or undefined" or have an unexpected length/value:');
  console.log('1. Ensure `.env.local` is in the project ROOT directory (same level as `package.json`).');
  console.log('2. Verify correct variable names in `.env.local` (MUST start with `NEXT_PUBLIC_`).');
  console.log('3. **CRITICAL: Restart your Next.js development server (`npm run dev`) after any `.env.local` changes.**');
  console.log('4. Double-check for typos in the copied values from your Firebase console.');
  console.log('------------------------------------------\n');
}

// --- URGENT: RESOLVING "auth/invalid-api-key" ---
// This error means the API key provided to Firebase is INCORRECT or RESTRICTED for the specified Firebase project.
// The JavaScript code below for `firebaseConfig` is standard. The problem is almost certainly
// with the VALUES in your .env.local file or your Firebase/Google Cloud project settings.
//
// PLEASE METICULOUSLY VERIFY THE FOLLOWING AFTER CHECKING THE SERVER LOGS ABOVE:
//
// 1.  **API KEY VALUE in `.env.local`**:
//     *   Is `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local` EXACTLY correct?
//     *   Copy it directly from: Firebase Console > Project settings (gear icon) > General tab > Your apps > Web app > Firebase SDK snippet > `apiKey`.
//     *   NO typos, NO extra spaces, NOT truncated.
//
// 2.  **ALL FIREBASE CONFIG VALUES in `.env.local`**:
//     *   Ensure `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, etc., also EXACTLY match your Firebase project.
//     *   An API key is often tied to a specific project ID and auth domain. Mismatches can cause "invalid-api-key".
//
// 3.  **SERVER RESTART (Again, this is critical!)**:
//     *   Have you RESTARTED your Next.js development server (`npm run dev`) AFTER saving changes to `.env.local`? This is ESSENTIAL.
//
// 4.  **`.env.local` FILE LOCATION & NAME**:
//     *   Is your file named exactly `.env.local`? Is it in the VERY ROOT of your project (same level as `package.json`)?
//
// 5.  **FIREBASE PROJECT SETTINGS**:
//     *   **Authentication Enabled**: In Firebase Console > Build > Authentication: Click "Get started" if you haven't, and ensure at least one provider (e.g., Email/Password) is enabled.
//     *   **API Key Restrictions (Google Cloud Console)**:
//         *   Navigate to Google Cloud Console > APIs & Services > Credentials.
//         *   Select the API key used by Firebase (often "Browser key (auto created by Firebase)").
//         *   Under "Application restrictions", try setting to "None" temporarily for testing, or ensure your app's domain (e.g., `localhost:your_port`) is allowed.
//         *   Under "API restrictions", ensure "Identity Platform API" (sometimes listed as "Cloud Identity Platform API" or similar for Firebase Auth) and "Cloud Firestore API" are allowed.
//
// If the server log above shows your API key as "Present" with a reasonable length,
// but the error persists, the key itself is likely invalid for the configured project ID/auth domain,
// or it's restricted in Google Cloud Console.
//
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
// THE ERROR "auth/invalid-api-key" ORIGINATES HERE IF THE API KEY IN `firebaseConfig` (derived from your .env.local) IS REJECTED BY FIREBASE.
// This usually means the apiKey value from .env.local is incorrect, not loaded, or restricted.
const auth: Auth = getAuth(app);

export { app, db, auth };
