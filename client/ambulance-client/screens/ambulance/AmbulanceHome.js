import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/authService';

export default function AmbulanceHome() {
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser(); // central logout logic
      setUser(null);      // clear context
      navigation.replace('LoginScreen'); // navigate
    } catch (err) {
      Alert.alert('Logout Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Ambulance Dashboard</Text>
      <Button title="Logout" onPress={handleLogout} color="#c62828" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 }
});
