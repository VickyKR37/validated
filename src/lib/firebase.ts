
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
  console.log('\n\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log('--- Firebase Initialization Server Log (BEGIN) ---');
  const criticalEnvVars: { name: string; value: string | undefined }[] = [
    { name: 'NEXT_PUBLIC_FIREBASE_API_KEY', value: process.env.NEXT_PUBLIC_FIREBASE_API_KEY },
    { name: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', value: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN },
    { name: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', value: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID },
    { name: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', value: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET },
    { name: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', value: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID },
    { name: 'NEXT_PUBLIC_FIREBASE_APP_ID', value: process.env.NEXT_PUBLIC_FIREBASE_APP_ID },
    { name: 'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', value: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID }, // Optional
  ];

  let allCriticalVarsPresent = true;
  criticalEnvVars.forEach(envVar => {
    let statusMessage = '!!!!!!!! NOT SET or undefined !!!!!!!! -- THIS IS A MAJOR PROBLEM!';
    if (envVar.value && envVar.value.trim() !== '') {
      // Log the presence and length, but NOT the value of API_KEY for security, unless specifically debugging.
      // For Project ID, value is less sensitive and can be logged for easier cross-referencing.
      const displayValue = envVar.name === 'NEXT_PUBLIC_FIREBASE_API_KEY' ? `Present (Length: ${envVar.value.length})` : `Present (Value: ${envVar.value})`;
      statusMessage = displayValue;
      console.log(`[Firebase Setup] ${envVar.name}: ${statusMessage}`);
    } else {
      if (envVar.name === 'NEXT_PUBLIC_FIREBASE_API_KEY' || envVar.name === 'NEXT_PUBLIC_FIREBASE_PROJECT_ID') {
        allCriticalVarsPresent = false; // Mark that essential vars are missing
      }
      console.error(`[Firebase Setup CRITICAL ERROR] ${envVar.name}: ${statusMessage}`);
    }
  });

  if (!allCriticalVarsPresent) {
    console.error('\n[Firebase Setup CRITICAL FAILURE] `NEXT_PUBLIC_FIREBASE_API_KEY` or `NEXT_PUBLIC_FIREBASE_PROJECT_ID` (or both) are missing or undefined on the server!');
    console.error('PLEASE CHECK THE FOLLOWING:');
    console.error('1. Your `.env.local` file is in the project ROOT directory (same level as `package.json`).');
    console.error('2. All `NEXT_PUBLIC_FIREBASE_...` variables are correctly named and have values in `.env.local`.');
    console.error('3. **YOU HAVE RESTARTED your Next.js development server (`npm run dev`) after creating or modifying `.env.local`.**');
    console.error('------------------------------------------');
  } else {
    console.log('[Firebase Setup] All critical Firebase environment variables (`API_KEY` and `PROJECT_ID`) seem to be present in `.env.local` and loaded by the server.');
    console.log('If "auth/invalid-api-key" error persists despite keys being present, carefully verify:');
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
  console.log('--- Firebase Initialization Server Log (END) ---');
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\n');
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

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;


// --- URGENT: RESOLVING "CRITICAL FIREBASE CONFIG ERROR" or "auth/invalid-api-key" ---
// The error you might be seeing means Firebase initialization failed.
// The "Firebase Initialization Server Log" printed above this should help pinpoint the issue.
//
// PLEASE METICULOUSLY VERIFY THE FOLLOWING:
//
// 1.  **SERVER RESTART**:
//     *   **YOU MUST RESTART your Next.js development server (`npm run dev`) EVERY TIME you create or modify `.env.local`.**
//     *   This is the MOST COMMON REASON for this error if you believe your keys are correct.
//
// 2.  **`.env.local` FILE & VALUES**:
//     *   **Location**: Is `.env.local` in the VERY ROOT of your project (same level as `package.json`)?
//     *   **Naming**: Is the file *exactly* named `.env.local` (all lowercase, starts with a dot)?
//     *   **Variable Names**: Are all variables prefixed with `NEXT_PUBLIC_FIREBASE_` (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`)?
//     *   **Values**: Are the values for `NEXT_PUBLIC_FIREBASE_API_KEY` and `NEXT_PUBLIC_FIREBASE_PROJECT_ID` (and others) EXACTLY correct?
//         *   Copy them from: Firebase Console > Project settings (gear icon) > General tab > Your apps > Web app > Firebase SDK snippet > `apiKey`, `projectId`, etc.
//         *   NO typos, NO extra spaces, NOT truncated.
//
// 3.  **FIREBASE PROJECT SETTINGS**:
//     *   **Authentication Enabled**: In Firebase Console > Build > Authentication: Click "Get started" if you haven't, and ensure at least one provider (e.g., Email/Password) is enabled.
//
// 4.  **API KEY RESTRICTIONS (Google Cloud Console)**:
//     *   Go to Google Cloud Console > APIs & Services > Credentials.
//     *   Select the API key used by Firebase.
//     *   "Application restrictions": For testing, try "None". If using HTTP referrers, ensure `localhost:YOUR_PORT_NUMBER` (e.g., `localhost:9002`) is allowed.
//     *   "API restrictions": Ensure "Cloud Identity Platform API" (or "Identity Platform API") AND "Cloud Firestore API" are enabled.
//
// Pre-initialization check: Log and THROW if critical config values are missing.
// This prevents Firebase services from being called with an uninitialized/dummy app object.
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  const apiKeyStatus = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? `PRESENT (Length: ${process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length})` : '!!! UNDEFINED/MISSING !!!';
  const projectIdStatus = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? `PRESENT (Value: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID})` : '!!! UNDEFINED/MISSING !!!';

  const errorMessage =
    "STOP! SERVER RESTART IS MANDATORY IF `.env.local` WAS MODIFIED. \n\n" +
    "CRITICAL FIREBASE CONFIGURATION ERROR:\n" +
    `  NEXT_PUBLIC_FIREBASE_API_KEY Status: [${apiKeyStatus}]\n` +
    `  NEXT_PUBLIC_FIREBASE_PROJECT_ID Status: [${projectIdStatus}]\n\n` +
    "One or both of these critical Firebase environment variables were UNDEFINED when the server tried to start. \n" +
    "This means your `.env.local` file is likely:\n" +
    "  1. MISSING from the project root (it must be at the same level as package.json).\n" +
    "  2. INCORRECTLY NAMED (must be exactly `.env.local`).\n" +
    "  3. Contains incorrect VARIABLE NAMES (they MUST start with `NEXT_PUBLIC_FIREBASE_...`).\n" +
    "  4. Or, your Next.js server was NOT RESTARTED after creating or modifying `.env.local` (THIS IS THE MOST LIKELY ISSUE AND IS ABSOLUTELY ESSENTIAL!).\n\n" +
    "Firebase cannot be initialized. \n" +
    "ACTION: PLEASE CHECK YOUR `.env.local` SETUP METICULOUSLY AND THEN **RESTART THE SERVER (`npm run dev`)**.\n" +
    "Refer to the 'Firebase Initialization Server Log' printed earlier in your server console for a full status of all Firebase environment variables.\n" +
    "Verify values copied from Firebase Console: Project Settings > General > Your Apps > Web app > Firebase SDK snippet (Config).\n";


  console.error("\n\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.error("!!!!!!!!!!!!!!!!!!!!  CRITICAL FIREBASE CONFIGURATION ERROR   !!!!!!!!!!!!!!!!!!!!");
  console.error(errorMessage);
  console.error("This error was thrown from 'src/lib/firebase.ts' because essential Firebase configuration was not found by the server.");
  console.error("THE MOST COMMON FIX IS TO ENSURE `.env.local` IS CORRECT AND THEN **RESTART YOUR `npm run dev` SERVER**.");
  console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\n");

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
db = getFirestore(app);
auth = getAuth(app); // This line will throw "auth/invalid-api-key" if apiKey is wrong

export { app, db, auth };
