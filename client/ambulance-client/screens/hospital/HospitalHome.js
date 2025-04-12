import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { useAuth } from '../../context/AuthContext';

export default function HospitalHome() {
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Hospital Dashboard</Text>
      <Button title="Logout" onPress={handleLogout} color="#d9534f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 }
});
