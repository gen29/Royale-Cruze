import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword || !number) {
      alert('Please fill all the fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    const user = { email, username, password, number };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      alert('Account created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      alert('Error saving user data');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.line} />

        <View style={styles.inputBox}>
          <Image source={require('../assets/logo.png')} resizeMode="contain" style={styles.logoBackground} />
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} color="#754E1A" style={styles.icon} />
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="#758694"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="person-circle-outline" size={25} color="#754E1A" style={styles.icon} />
              <TextInput
                placeholder="Username"
                style={styles.input}
                placeholderTextColor="#758694"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="call-outline" size={25} color="#754E1A" style={styles.icon} />
              <TextInput
                placeholder="Contact Number"
                placeholderTextColor="#758694"
                style={styles.input}
                value={number}
                keyboardType="numeric"
                onChangeText={setNumber}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} color="#754E1A" style={styles.icon} />
              <TextInput
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#758694"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="eye-off-outline" size={25} color="#754E1A" style={styles.icon} />
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                placeholderTextColor="#758694"
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.login}>
                Already have an account? <Text style={styles.loginText}>Login</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EDD3',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  title: {
    marginTop: height * 0.05,
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    color: '#780C28',
  },
  line: {
    marginTop: 10,
    height: 1,
    width: '85%',
    backgroundColor: '#8B4513',
    marginBottom: 20,
  },
  inputBox: {
    width: '90%',
    height: 'auto',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 30,
    marginTop: 10,
  },
  logoBackground: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    top: height * 0.1,
    opacity: 0.15,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#FBFFE4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8B4513',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#000',
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '60%',
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  login: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  loginText: {
    color: '#780C28',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
