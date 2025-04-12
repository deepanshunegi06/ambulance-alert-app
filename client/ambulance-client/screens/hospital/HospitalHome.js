import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../services/authService'; // ✅ import logout function

export default function HospitalHome() {
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser(); // ✅ use shared logout function
      setUser(null);
      navigation.replace('LoginScreen');
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
