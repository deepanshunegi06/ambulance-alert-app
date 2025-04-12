import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBie8zfEoRCebltXgQ3lpdqFHYy7Z_nePI",
  authDomain: "ambulance-alert-app.firebaseapp.com",
  projectId: "ambulance-alert-app",
  storageBucket: "ambulance-alert-app.appspot.com",
  messagingSenderId: "330722080786",
  appId: "1:330722080786:web:a267859af5a9986761c0cb",
  measurementId: "G-Q7T4QFC8TZ",
};

// ✅ Only initialize app if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Prevent "already-initialized" error
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app); // if already initialized
}

export { auth };
