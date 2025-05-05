import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CompareScreen from '../screens/CompareScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SavedCarsScreen from '../screens/SavedScreen';
import CarDetailsScreen from '../screens/brands/CarDetailsScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- Bottom Tabs ---
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF0D9',
          height: 60,
          paddingBottom: 10,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#555',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Category') {
            iconName = focused ? 'car-sport' : 'car-sport-outline';
          } else if (route.name === 'Compare') {
            iconName = focused ? 'git-compare' : 'git-compare-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen
        name="Compare"
        component={CompareScreen}
        initialParams={{ car1: null }}  // Set default car1 if not passed
      />
    </Tab.Navigator>
  );
}

// --- Drawer Navigator ---
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="BottomTabs"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#854836',
          height: 100,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 22,
        },
        headerTitleAlign: 'center',
        drawerStyle: {
          backgroundColor: '#FFF0D9',
          width: 250,
          height: 250, 
          marginTop: 80,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        },
        drawerActiveTintColor: '#D35400',
        drawerInactiveTintColor: '#4E1F00',
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="menu" size={30} color="white" style={{ marginRight: 10 }} />
            </View>
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          >
            <Image
              source={require('../assets/logo.png')}
              style={{ width: 60, height: 60 }}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          drawerItemStyle: { height: 0 },
          drawerLabel: () => null,
          title: '',
        }}
      />
      <Drawer.Screen
        name="My Account"
        component={ProfileScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Saved Cars"
        component={SavedCarsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Log Out"
        component={LoginScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// --- Main Stack Navigator ---
export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
    </Stack.Navigator>
  );
}
