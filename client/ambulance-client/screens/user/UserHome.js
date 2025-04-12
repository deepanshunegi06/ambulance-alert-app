import React from 'react';
import { View, Text, Button } from 'react-native';
import { logoutUser } from '../../services/authService';

export default function UserHome() {
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the User Dashboard</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
