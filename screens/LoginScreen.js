import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (!storedUser) {
        alert('No user found. Please register first.');
        return;
      }
  
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.username === username && parsedUser.password === password) {
        navigation.replace('Nav');
      } else {
        alert('Invalid Username or Password');
      }
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>

      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
          <Icon name="person-circle-outline" size={25} color="#754E1A" style={styles.icon} />
          <TextInput
            placeholder='Enter Username'
            placeholderTextColor={"#758694"}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={25} color="#754E1A" style={styles.icon} />
          <TextInput
            placeholder='Enter Password'
            placeholderTextColor={"#758694"}
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.register}>
            Don't have an account yet? <Text style={styles.registerText}>Register</Text>
          </Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EDD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#780C28',
    marginBottom: height * 0.02,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#FBFFE4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8B4513',
    marginBottom: 15,
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
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  register: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  registerText: {
    color: '#780C28',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
