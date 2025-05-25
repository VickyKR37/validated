
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
  console.log('\n\n--- Firebase Initialization Server Log (BEGIN) ---');
  const criticalEnvVars: { name: string; value: string | undefined }[] = [
    { name: 'NEXT_PUBLIC_FIREBASE_API_KEY', value: process.env.NEXT_PUBLIC_FIREBASE_API_KEY },
    { name: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', value: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN },
    { name: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', value: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID },
    { name: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', value: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET },
    { name: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', value: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID },
    { name: 'NEXT_PUBLIC_FIREBASE_APP_ID', value: process.env.NEXT_PUBLIC_FIREBASE_APP_ID },
  ];

  let allCriticalVarsPresent = true;
  criticalEnvVars.forEach(envVar => {
    let statusMessage = '!!!!!!!! NOT SET or undefined !!!!!!!! -- THIS IS A MAJOR PROBLEM!';
    if (envVar.value) {
      // For the API key, log its presence and length for verification, but not the key itself in production.
      // The temporary direct log of the API key was for acute debugging and should be removed if still present.
      statusMessage = `Present. Length: ${envVar.value.length}.`;
      if (envVar.name === 'NEXT_PUBLIC_FIREBASE_API_KEY') {
        // TEMPORARY DEBUGGING: This line logs the API key. REMOVE IT AFTER VERIFICATION. DO NOT COMMIT.
        // console.error(`[Firebase Setup - DEBUG ONLY] ${envVar.name} value being used: "${envVar.value}" <-- VERIFY THIS VALUE EXACTLY! REMOVE THIS LOG AFTER DEBUGGING.`);
      }
      console.log(`[Firebase Setup] ${envVar.name}: ${statusMessage}`);
    } else {
      allCriticalVarsPresent = false;
      console.error(`[Firebase Setup CRITICAL ERROR] ${envVar.name}: ${statusMessage}`);
    }
  });

  if (!allCriticalVarsPresent) {
    console.error('\n[Firebase Setup CRITICAL FAILURE] One or more Firebase environment variables are missing or undefined on the server!');
    console.error('PLEASE CHECK THE FOLLOWING:');
    console.error('1. Your `.env.local` file is in the project ROOT directory (same level as `package.json`).');
    console.error('2. All `NEXT_PUBLIC_FIREBASE_...` variables are correctly named and have values in `.env.local`.');
    console.error('3. **YOU HAVE RESTARTED your Next.js development server (`npm run dev`) after creating or modifying `.env.local`.**');
    console.error('------------------------------------------');
  } else {
    console.log('[Firebase Setup] All critical environment variables seem to be present in `.env.local` and loaded by the server.');
    console.log('If "auth/invalid-api-key" error persists, carefully verify:');
    console.log('1. The API key value in your `.env.local` EXACTLY matches the one in your Firebase console.');
    console.log('   (Project settings (gear icon) > General tab > Your apps > Web app > Firebase SDK snippet > `apiKey`)');
    console.log('2. Firebase Authentication is ENABLED in your Firebase project (Build > Authentication > Get started).');
    console.log('3. API Key Restrictions in Google Cloud Console:');
    console.log('   - Go to Google Cloud Console > APIs & Services > Credentials.');
    console.log('   - Select the API key used by Firebase.');
    console.log('   - "Application restrictions": Try "None" for testing, or ensure `localhost:PORT` (your dev port) is allowed.');
    console.log('   - "API restrictions": Ensure "Cloud Identity Platform API" (or "Identity Platform API") AND "Cloud Firestore API" are allowed.');
    console.log('4. You have RESTARTED your Next.js development server after ANY .env.local or Firebase/GCP console changes.');
  }
  console.log('--- Firebase Initialization Server Log (END) ---\n\n');
}


// --- URGENT: RESOLVING "auth/invalid-api-key" or related initialization errors ---
// These errors mean the API key or other critical Firebase config provided (from your .env.local) is INCORRECT, MISSING, or RESTRICTED.
// The JavaScript code below for `firebaseConfig` is standard.
// The problem is almost certainly with:
//   A) The VALUES in your .env.local file.
//   B) Your .env.local file NOT BEING LOADED (missing, wrong location, or server not restarted after changes).
//   C) Your Firebase/Google Cloud project settings.
//
// PLEASE METICULOUSLY VERIFY THE FOLLOWING (after checking the server logs printed above):
//
// 1.  **`.env.local` FILE & VALUES**:
//     *   **Location**: Is `.env.local` in the VERY ROOT of your project (same level as `package.json`)?
//     *   **Names**: Are all variables prefixed with `NEXT_PUBLIC_FIREBASE_`?
//     *   **`NEXT_PUBLIC_FIREBASE_API_KEY`**: Is this value EXACTLY correct? Copy it from:
//         Firebase Console > Project settings (gear icon) > General tab > Your apps > Web app > Firebase SDK snippet > `apiKey`.
//         NO typos, NO extra spaces, NOT truncated.
//     *   **`NEXT_PUBLIC_FIREBASE_PROJECT_ID`**: Also critical for initialization. Verify this.
//     *   **Other Values**: Ensure `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, etc., also EXACTLY match.
//
// 2.  **SERVER RESTART (CRITICAL!)**:
//     *   Have you RESTARTED your Next.js development server (`npm run dev`) AFTER saving changes to `.env.local`? This is ESSENTIAL.
//
// 3.  **FIREBASE PROJECT SETTINGS**:
//     *   **Authentication Enabled**: In Firebase Console > Build > Authentication: Click "Get started" if you haven't, and ensure at least one provider (e.g., Email/Password) is enabled.
//
// 4.  **API KEY RESTRICTIONS (Google Cloud Console)**:
//     *   Go to Google Cloud Console > APIs & Services > Credentials.
//     *   Select the API key used by Firebase (often "Browser key (auto created by Firebase)").
//     *   "Application restrictions": For testing, try "None". If using HTTP referrers, ensure `localhost:YOUR_PORT_NUMBER` (e.g., `localhost:9002`) is allowed.
//     *   "API restrictions": Ensure "Cloud Identity Platform API" (or "Identity Platform API") AND "Cloud Firestore API" are enabled.
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

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

// Pre-initialization check: Log and THROW if critical config values are missing.
// This prevents Firebase services from being called with an uninitialized/dummy app object.
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  const errorMessage =
    "CRITICAL FIREBASE CONFIG ERROR: `NEXT_PUBLIC_FIREBASE_API_KEY` or `NEXT_PUBLIC_FIREBASE_PROJECT_ID` is missing or undefined. " +
    "This means your `.env.local` file is likely missing, in the wrong location, has incorrect variable names (must start with NEXT_PUBLIC_), " +
    "or your Next.js server was not restarted after changes to `.env.local`. " +
    "Firebase cannot be initialized. Please check your setup and restart the server.";
  
  console.error("\n\n**********************************************************************************");
  console.error(errorMessage);
  if (!firebaseConfig.apiKey) console.error("Specifically, `NEXT_PUBLIC_FIREBASE_API_KEY` is missing from environment variables for Firebase config.");
  if (!firebaseConfig.projectId) console.error("Specifically, `NEXT_PUBLIC_FIREBASE_PROJECT_ID` is missing from environment variables for Firebase config.");
  console.error("**********************************************************************************\n\n");
  
  // Throw an error to halt further execution if Firebase is critical for the app.
  // If you reach this point, the app cannot function correctly without Firebase.
  throw new Error(errorMessage);
}

// Initialize Firebase ONLY if critical config is present
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// THE ERROR "auth/invalid-api-key" ORIGINATES HERE IF THE API KEY IN `firebaseConfig` (derived from your .env.local) IS REJECTED BY FIREBASE.
// This usually means the apiKey value from .env.local is incorrect, not loaded, or restricted.
// If the error above ("CRITICAL FIREBASE CONFIG ERROR") was thrown, these lines won't be reached.
db = getFirestore(app);
auth = getAuth(app);

export { app, db, auth };
