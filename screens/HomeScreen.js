import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';
import { brands } from '../screens/brands/BrandData';


export default function HomeScreen({ navigation }) {
  const handleBrandPress = (brand) => {
    navigation.navigate('BrandScreen', { brand });
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Royal Cruze</Text>
        <Text style={styles.tagline}>Drive with Prestige, Rule the Road</Text>

        <View style={styles.videoWrapper}>
          <Video
            source={require('../assets/car.mp4')}
            shouldPlay
            isLooping
            resizeMode="CONTAIN"
            style={styles.video}
          />
        </View>

        <Text style={styles.welcomeText}>
          Find your dream car. Fast. Reliable. Trusted. We bring you the most popular and luxurious car brands in one place.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Brands</Text>
        <View style={styles.brandGrid}>
          {brands.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.logoItem}
              onPress={() => handleBrandPress(item)}
            >
              <Image source={item.logo} style={styles.logoImage} resizeMode="contain" />
              <Text style={styles.logoText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EDD3',
    padding: 16,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E1C0B',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#7D5A4F',
    marginBottom: 16,
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    fontSize: 15,
    color: '#3D2C22',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E1C0B',
    marginBottom: 12,
  },
  brandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  logoItem: {
    alignItems: 'center',
    backgroundColor: '#FBFFE4',
    padding: 16,
    borderRadius: 20,
    width: '30%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C28B5E',
  },
  logoImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: '#3B2B20',
  },
});
