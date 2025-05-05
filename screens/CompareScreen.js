import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import brandData from './brands/BrandData';
import { brands } from './brands/BrandData';
import { Ionicons } from '@expo/vector-icons';

const extractSpecValue = (specsArray, keyword) => {
  const spec = specsArray.find(s => s.toLowerCase().includes(keyword.toLowerCase()));
  if (spec) {
    const match = spec.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
  }
  return null;
};

const highlight = (val1, val2) => {
  if (val1 > val2) return ['green', 'black'];
  if (val1 < val2) return ['black', 'green'];
  return ['black', 'black'];
};

export default function CompareScreen({ route, navigation }) {
  const { car1 } = route.params;  
  const [allCars, setAllCars] = useState([]);
  const [selected1, setSelected1] = useState(car1 || "");  
  const [selected2, setSelected2] = useState("");  

  useEffect(() => {
    const loadCars = async () => {
      const cars = brandData?.cars ? Object.values(brandData.cars).flat() : [];
      setAllCars(cars);
    };

    loadCars();
  }, []);

  const car1Obj = allCars.find(car => car.name === selected1);
  const car2Obj = allCars.find(car => car.name === selected2);

  let en1, en2, hp1, hp2, tq1, tq2;
  let enColor1 = 'black', enColor2 = 'black', hpColor1 = 'black', hpColor2 = 'black', tqColor1 = 'black', tqColor2 = 'black';

  if (car1Obj && car2Obj) {
    en1 = extractSpecValue(car1Obj.specs, 'engine');
    en2 = extractSpecValue(car2Obj.specs, 'engine');
    hp1 = extractSpecValue(car1Obj.specs, 'horsepower');
    hp2 = extractSpecValue(car2Obj.specs, 'horsepower');
    tq1 = extractSpecValue(car1Obj.specs, 'torque');
    tq2 = extractSpecValue(car2Obj.specs, 'torque');
    [enColor1, enColor2] = highlight(en1, en2);
    [hpColor1, hpColor2] = highlight(hp1, hp2);
    [tqColor1, tqColor2] = highlight(tq1, tq2);
  }

  const getCarLogo = (carName) => {
    const brand = brands.find(brand => carName.includes(brand.name));
    return brand ? brand.logo : null;
  };

  const clearSelection = () => {
    setSelected1("");
    setSelected2("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#854836" />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Compare Cars</Text>

        <Text style={styles.pickerLabel}>Select Car 1:</Text>
        <Picker
          selectedValue={selected1}
          onValueChange={(itemValue) => setSelected1(itemValue || "")}  // Make sure the value is never null
          style={styles.picker}
        >
          <Picker.Item label="Select a car" value="" />
          {allCars.map((car) => (
            <Picker.Item key={`${car.id}-${car.name}`} label={car.name} value={car.name} />
          ))}
        </Picker>

        <Text style={styles.pickerLabel}>Select Car 2:</Text>
        <Picker
          selectedValue={selected2}
          onValueChange={(itemValue) => setSelected2(itemValue || "")}  // Make sure the value is never null
          style={styles.picker}
        >
          <Picker.Item label="Select a car" value="" />
          {allCars.map((car) => (
            <Picker.Item key={`${car.id}-${car.name}`} label={car.name} value={car.name} />
          ))}
        </Picker>

        {car1Obj && car2Obj && (
          <View style={styles.row}>
            {[car1Obj, car2Obj].map((car, idx) => (
              <View key={`${car.id}-${car.name}`} style={styles.card}>
                {getCarLogo(car.name) && (
                  <Image source={getCarLogo(car.name)} style={styles.logo} />
                )}
                <Image source={car.images[0]} style={styles.image} />
                <View style={styles.cardText}>
                  <Text style={styles.name}>{car.name}</Text>
                  <Text style={[styles.specText, { color: idx === 0 ? enColor1 : enColor2 }]} >
                    Engine: {idx === 0 ? en1 : en2} L
                  </Text>
                  <Text style={[styles.specText, { color: idx === 0 ? hpColor1 : hpColor2 }]} >
                    Horsepower: {idx === 0 ? hp1 : hp2} hp
                  </Text>
                  <Text style={[styles.specText, { color: idx === 0 ? tqColor1 : tqColor2 }]} >
                    Torque: {idx === 0 ? tq1 : tq2} nm
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
        
        <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EDD3',
    paddingTop: 50, // Added top padding for space
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  picker: {
    width: '90%',
    backgroundColor: '#FBFFE4',
    marginBottom: 16,
    height: 50,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#854836',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  card: {
    backgroundColor: '#FBFFE4',
    width: '43%',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B89E84',
    paddingTop: 8,
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
  specText: {
    fontSize: 14,
    marginTop: 4,
    color: '#7B5E43',
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#E5120F',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    left: 18,
    zIndex: 10,
    padding: 6,
    borderRadius: 20,
  },
});
