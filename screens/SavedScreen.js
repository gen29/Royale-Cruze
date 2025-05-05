import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SavedCarsScreen() {
  const [savedCars, setSavedCars] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadSavedCars = async () => {
      const data = await AsyncStorage.getItem('likedCars');
      const likedCars = data ? JSON.parse(data) : [];
      setSavedCars(likedCars);
    };

    const unsubscribe = navigation.addListener('focus', loadSavedCars);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CarDetails', { car: item })}
    >
      <Image source={item.images[0]} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {savedCars.length === 0 ? (
        <Text style={styles.emptyText}>No saved cars yet.</Text>
      ) : (
        <FlatList
          data={savedCars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EDD3',
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FBFFE4',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor:'#8B4513',
    elevation: 2,
  },
  image: {
    width: 120,
    height: 100,
  },
  details: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E1F00',
  },
  type: {
    fontSize: 14,
    color: '#7B4C3A',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5120F',
    marginTop: 8,
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 40,
  },
});
