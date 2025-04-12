import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Success',
        'Password reset email sent. Check your inbox.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Delay navigation to prevent visual bounce
              setTimeout(() => {
                navigation.replace('LoginScreen');
              }, 300);
            },
          },
        ]
      );
    } catch (error) {
      console.error('Reset error:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>
      <TextInput
        placeholder="Enter your email"
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#005aab" />
      ) : (
        <Button title="Send Reset Email" onPress={handleReset} color="#005aab" />
      )}

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20, alignItems: 'center' }}
      >
        <Text style={{ color: '#005aab', fontWeight: 'bold' }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#005aab',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
  },
});
