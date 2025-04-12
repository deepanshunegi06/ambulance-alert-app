import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

import { auth } from '../services/firebaseConfig';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import UserHome from '../screens/user/UserHome';
import AmbulanceHome from '../screens/ambulance/AmbulanceHome';
import HospitalHome from '../screens/hospital/HospitalHome';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const response = await axios.get(
            `http://192.168.1.17:5000/api/auth/${currentUser.uid}`
          );
          setRole(response.data.role);
        } catch (error) {
          console.log('❌ Error fetching user role:', error.message);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="UserHome" component={UserHome} />
      <Stack.Screen name="AmbulanceHome" component={AmbulanceHome} />
      <Stack.Screen name="HospitalHome" component={HospitalHome} />
    </Stack.Navigator>
  );
}
