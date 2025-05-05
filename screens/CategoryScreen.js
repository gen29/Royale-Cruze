import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

const categories = [
  { id: '1', name: 'Sedan', image: require('../assets/category/sedan.png') },
  { id: '2', name: 'SUV / Crossover', image: require('../assets/category/suv.png') },
  { id: '3', name: 'Coupe / Convertible', image: require('../assets/category/coupe.png') },
  { id: '4', name: 'Hatchback', image: require('../assets/category/hatchback.png') },
  { id: '5', name: 'Pickup Truck', image: require('../assets/category/pickup.png') },
  { id: '6', name: 'Minivan / MPV', image: require('../assets/category/minivan.png') },

];

export default function CategoryScreen({ navigation }) {
  return (
    <View style={styles.screen}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Car Body Types</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.carContainer}
            onPress={() => navigation.navigate('CategoryDetails', { type: category.name })}
          >
            <Image source={category.image} style={styles.icon} />
            <Text style={styles.carText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4EDD3',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#F4EDD3',
  },
  title: {
    fontSize: 33,
    fontWeight: '700',
    color: '#4E1F00',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  carContainer: {
    backgroundColor: '#FBFFE4',
    width: '40%',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 5,
    margin: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#945034',
    borderWidth: 1.5,
    top: 60
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  carText: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
    color: '#4E1F00',
    textAlign: 'center',
  },
});
