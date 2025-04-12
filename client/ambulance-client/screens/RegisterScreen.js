import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Button,
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
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const [form, setForm] = useState({
    email: '',
    phone: '',
    password: '',
    role: '',
    ambulanceNumber: '',
    driverName: '',
    hospitalName: '',
    hospitalAddress: '',
  });

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setUser } = useAuth();

  // Create refs for better keyboard handling
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const ambulanceNumberRef = useRef(null);
  const driverNameRef = useRef(null);
  const hospitalNameRef = useRef(null);
  const hospitalAddressRef = useRef(null);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleRegister = async () => {
    const { email, phone, password, role } = form;

    if (!email || !phone || !password || !role) {
      Alert.alert('Incomplete Info', 'Please fill all required fields and select a role.');
      return;
    }

    if (role === 'ambulance' && (!form.ambulanceNumber || !form.driverName)) {
      Alert.alert('Incomplete Info', 'Please fill all ambulance details.');
      return;
    }

    if (role === 'hospital' && (!form.hospitalName || !form.hospitalAddress)) {
      Alert.alert('Incomplete Info', 'Please fill all hospital details.');
      return;
    }

    try {
      setLoading(true);
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const profile = await registerUser({
        uid,
        email,
        phone,
        role,
        ambulanceNumber: role === 'ambulance' ? form.ambulanceNumber : undefined,
        driverName: role === 'ambulance' ? form.driverName : undefined,
        hospitalName: role === 'hospital' ? form.hospitalName : undefined,
        hospitalAddress: role === 'hospital' ? form.hospitalAddress : undefined,
      });

      setUser(profile);

      if (role === 'user') navigation.replace('UserHome');
      else if (role === 'ambulance') navigation.replace('AmbulanceHome');
      else if (role === 'hospital') navigation.replace('HospitalHome');
    } catch (err) {
      console.error('Registration error:', err);
      Alert.alert('Registration Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = () => {
    switch (form.role) {
      case 'ambulance':
        return '#e74c3c';
      case 'hospital':
        return '#3498db';
      case 'user':
        return '#2ecc71';
      default:
        return '#3498db';
    }
  };

  const renderRoleSpecificFields = () => {
    if (form.role === 'ambulance') {
      return (
        <View style={styles.roleSpecificContainer}>
          <Text style={styles.sectionTitle}>Ambulance Details</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={ambulanceNumberRef}
              placeholder="Ambulance Registration Number"
              style={styles.input}
              onChangeText={(val) => handleChange('ambulanceNumber', val)}
              returnKeyType="next"
              onSubmitEditing={() => driverNameRef.current.focus()}
              placeholderTextColor="#a0a0a0"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={driverNameRef}
              placeholder="Driver Full Name"
              style={styles.input}
              onChangeText={(val) => handleChange('driverName', val)}
              returnKeyType="done"
              placeholderTextColor="#a0a0a0"
            />
          </View>
        </View>
      );
    }

    if (form.role === 'hospital') {
      return (
        <View style={styles.roleSpecificContainer}>
          <Text style={styles.sectionTitle}>Hospital Details</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={hospitalNameRef}
              placeholder="Hospital Name"
              style={styles.input}
              onChangeText={(val) => handleChange('hospitalName', val)}
              returnKeyType="next"
              onSubmitEditing={() => hospitalAddressRef.current.focus()}
              placeholderTextColor="#a0a0a0"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={hospitalAddressRef}
              placeholder="Hospital Address"
              style={styles.input}
              onChangeText={(val) => handleChange('hospitalAddress', val)}
              returnKeyType="done"
              multiline
              numberOfLines={2}
              placeholderTextColor="#a0a0a0"
            />
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground
         source={require('../assets/medical-background.webp')}//This is a placeholder - replace with your hospital image
        style={styles.backgroundImage}
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
              <Text style={styles.title}>Create Account</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="your.email@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={(val) => handleChange('email', val)}
                    returnKeyType="next"
                    onSubmitEditing={() => phoneRef.current.focus()}
                    placeholderTextColor="#a0a0a0"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    ref={phoneRef}
                    placeholder="Contact number"
                    keyboardType="phone-pad"
                    style={styles.input}
                    onChangeText={(val) => handleChange('phone', val)}
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
                    placeholder="Create a secure password"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(val) => handleChange('password', val)}
                    returnKeyType="done"
                    placeholderTextColor="#a0a0a0"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Select Your Role</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={form.role}
                    onValueChange={(val) => handleChange('role', val)}
                    style={styles.picker}
                    dropdownIconColor={getRoleColor()}
                  >
                    <Picker.Item label="Select Role" value="" />
                    <Picker.Item label="Patient / User" value="user" />
                    <Picker.Item label="Ambulance Operator" value="ambulance" />
                    <Picker.Item label="Hospital" value="hospital" />
                  </Picker>
                </View>
              </View>

              {renderRoleSpecificFields()}

              <TouchableOpacity
                style={[styles.registerButton, { backgroundColor: getRoleColor() }]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.registerButtonText}>Register</Text>
                )}
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={[styles.loginLink, { color: getRoleColor() }]}>Login</Text>
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 30, 60, 0.7)',
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
  pickerWrapper: {
    backgroundColor: '#f8f9fb',
    borderWidth: 1,
    borderColor: '#e0e6ed',
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginTop: 10,
    marginBottom: 15,
  },
  roleSpecificContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  registerButton: {
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
  registerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#7f8c8d',
    fontSize: 15,
  },
  loginLink: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
});