import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import carData from './brands/BrandData';
import { brands } from './brands/BrandData';

export default function CategoryDetails({ route, navigation }) {
  const { type } = route.params;

  const allCars = Object.entries(carData.cars)
    .map(([brandName, cars]) =>
      cars.map(car => ({
        ...car,
        brand: brandName,
        logo: brands.find(b => b.name === brandName)?.logo,
      }))
    )
    .flat();

  const filteredCars = allCars.filter(car =>
    car.type.toLowerCase().includes(type.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{type}</Text>
      </View>

      <FlatList
        data={filteredCars}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CarDetails', { car: item })}
          >
            {item.logo && (
              <Image source={item.logo} style={styles.logo} />
            )}
            <Image source={item.images[0]} style={styles.image} />
            <View style={styles.cardText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EDD3',
  },
  header: {
    backgroundColor: '#854836',
    paddingVertical: 25,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 30
  },
  backButton: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FBFFE4',
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B89E84',
    paddingTop: 8,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cardText: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4E2F1E',
    textAlign: 'center',
  },
  type: {
    fontSize: 14,
    color: '#7B5E43',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#E5120F',
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});
