import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../services/authService';
import { fetchUserByUID } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setUser } = useAuth();

  // Create refs for better keyboard handling
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Incomplete Info', 'Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const firebaseUser = await loginUser(email, password);
      const profile = await fetchUserByUID(firebaseUser.uid);
      setUser(profile);

      if (profile.role === 'user') navigation.replace('UserHome');
      else if (profile.role === 'ambulance') navigation.replace('AmbulanceHome');
      else if (profile.role === 'hospital') navigation.replace('HospitalHome');
      else Alert.alert('Unknown Role', 'User role is not recognized.');
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Login Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const getButtonColor = () => {
    return '#3498db'; // Default blue, could be made dynamic based on user role if needed
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground
        source={require('../assets/medical-background.webp') // adjust path if in a different location
        } // Replace with your actual image path
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>MediCare</Text>
              <Text style={styles.headerSubtitle}>Healthcare Emergency Network</Text>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.title}>Welcome Back</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    ref={emailRef}
                    placeholder="your.email@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholderTextColor="#a0a0a0"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    ref={passwordRef}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                    returnKeyType="done"
                    placeholderTextColor="#a0a0a0"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.loginButton, { backgroundColor: getButtonColor() }]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.registerLink, { color: getButtonColor() }]}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',     // centers the image horizontally
    justifyContent: 'flex-start', // aligns it from the top
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 40, 70, 0.65)', // Slightly darker blue overlay
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 40 : 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 5,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 6,
    marginLeft: 2,
  },
  inputWrapper: {
    backgroundColor: '#f8f9fb',
    borderWidth: 1,
    borderColor: '#e0e6ed',
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    padding: 14,
    fontSize: 16,
    color: '#2c3e50',
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#7f8c8d',
    fontSize: 15,
  },
  registerLink: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
});