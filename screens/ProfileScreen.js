import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setName(parsedUser.username || '');
          setEmail(parsedUser.email || '');
          setPassword(parsedUser.password || '');
          setNumber(parsedUser.number || '');
        }
      } catch (error) {
        console.error('Failed to load user data:', error.message);
      }
    };

    loadUserData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#854836" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        {/* Empty view for symmetrical spacing */}
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/profile.jpg')} style={styles.image} />

        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Password</Text>
            <Text style={styles.value}>{password}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{number}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EDD3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F4EDD3',
  },
  backBtn: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#854836',
  },
  headerSpacer: {
    width: 32, // replaces the comment issue
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#854836',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderColor: '#85483633',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#854836',
    width: '40%',
  },
  value: {
    fontSize: 16,
    color: '#333',
    width: '55%',
    textAlign: 'right',
  },
});

export default ProfileScreen;
