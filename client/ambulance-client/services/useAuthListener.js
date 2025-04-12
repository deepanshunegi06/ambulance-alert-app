// services/useAuthListener.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import axios from 'axios';

export default function useAuthListener() {
  const [initializing, setInitializing] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
            const res = await axios.get(`http://192.168.1.17:5000/api/user/${user.uid}`);
          setUserRole(res.data.role);
        } catch (err) {
          console.log('Error fetching user role:', err.message);
        }
      } else {
        setUserRole(null);
      }

      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  return { initializing, userRole };
}
