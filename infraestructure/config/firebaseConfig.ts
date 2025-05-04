import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

if (!Constants.expoConfig?.extra?.apiKey) {
  throw new Error("Firebase API Key no está definida en app.config.js");
}
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra.apiKey,
  authDomain: Constants.expoConfig?.extra.authDomain,
  projectId: Constants.expoConfig?.extra.projectId,
  storageBucket: Constants.expoConfig?.extra.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra.messagingSenderId,
  appId: Constants.expoConfig?.extra.appId,
};

//patrón singleton
const app: FirebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const firestore = getFirestore(app);
export const auth = getAuth(app);