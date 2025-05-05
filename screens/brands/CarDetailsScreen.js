import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  FlatList 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CarDetails({ route, navigation }) {
  const { car } = route.params;
  const [liked, setLiked] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('likedCars');
      const likedCars = data ? JSON.parse(data) : [];
      setLiked(likedCars.some(item => item.id === car.id));
    })();
  }, []);

  const toggleLike = async () => {
    const data = await AsyncStorage.getItem('likedCars');
    let likedCars = data ? JSON.parse(data) : [];

    if (liked) {
      likedCars = likedCars.filter(item => item.id !== car.id);
    } else {
      likedCars.push(car);
    }

    await AsyncStorage.setItem('likedCars', JSON.stringify(likedCars));
    setLiked(!liked);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.imageWrapper}>
          <FlatList
            data={car.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onScroll={e =>
              setImgIndex(Math.round(e.nativeEvent.contentOffset.x / width))
            }
            renderItem={({ item }) => (
              <Image source={item} style={styles.image} />
            )}
          />
          <View style={styles.dots}>
            {car.images.map((_, i) => (
              <View key={i} style={[styles.dot, i === imgIndex && styles.activeDot]} />
            ))}
          </View>
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <View style={styles.row}>
            <Text style={styles.title}>{car.name}</Text>
            <TouchableOpacity onPress={toggleLike}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={26}
                color={liked ? '#E5120F' : '#854836'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.type}>{car.type}</Text>
          <Text style={styles.price}>{car.price}</Text>

          <View style={styles.line} />

          <Text style={styles.section}>Description</Text>
          <Text style={styles.description}>{car.description}</Text>

          <View style={styles.line} />

          <Text style={styles.section}>Specifications</Text>
          {(car.specs || []).map((spec, i) => (
            <Text key={i} style={styles.specText}>• {spec}</Text>
          ))}

          <TouchableOpacity 
            style={styles.compareBtn} 
            onPress={() => navigation.navigate('Compare', { car1: car.name })}
          >
            <Text style={styles.compareBtnText}>Compare</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F4EDD3',
  },
  container: {
    flex: 1,
  },
  backBtn: {
    position: 'absolute',
    top: 42,
    left: 18,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 20,
  },
  imageWrapper: {
    position: 'relative',
    width: width,
    height: 280,
  },
  image: {
    width: width,
    height: 280,
    resizeMode: 'cover',
  },
  dots: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9CBB0',
    margin: 4,
  },
  activeDot: {
    backgroundColor: '#854836',
  },
  content: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4E1F00',
  },
  type: {
    fontSize: 14,
    color: '#7B4C3A',
    marginTop: 4,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E5120F',
    marginVertical: 12,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4E2F1E',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#3B2B20',
    marginBottom: 12,
    lineHeight: 22,
  },
  specText: {
    fontSize: 15,
    color: '#4E2F1E',
    marginBottom: 6,
  },
  line: {
    height: 1,
    backgroundColor: '#D0BFAF',
    marginVertical: 16,
  },
  compareBtn: {
    backgroundColor: '#854836',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  compareBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
