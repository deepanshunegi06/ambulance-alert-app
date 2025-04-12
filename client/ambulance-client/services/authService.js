// services/authService.js
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Adjust if needed

// 🔐 Login user
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// 🔓 Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout failed:', error.message);
    throw error; // So the component using it can show an alert or handle it
  }
};

