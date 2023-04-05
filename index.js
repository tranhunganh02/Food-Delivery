import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import Home from './screens/home/Index';
import Logo from './screens/Amination/Logo';
import Product from './screens/Product/Index';
import Profile from './screens/Profile/Index';
import Information from './screens/Profile/Information';
import Address from './screens/Profile/Address';
import Favorite from './screens/Favorite/Index';
import SignIn from './screens/auth/SignIn';
import SignUp from './screens/auth/SignUp';
import Cart from './screens/Cart/Index';
import CheckOut from './screens/Checkout/Index';
import  AddFood  from './screens/Admin/FoodCRUD/AddFood'
import  ListFood  from './screens/Admin/FoodCRUD/ListFood'
import UpdateFood from './screens/Admin/FoodCRUD/UpdateFood'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const Index = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignIn}  />
            <Stack.Screen name="SignUp" component={SignUp}  />
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Logo" component={Logo}   options={{presentation: 'fullScreenModal'}}     />
            <Stack.Screen name="ProductDetails" component={Product} />
            <Stack.Screen name="CartDetails" component={Cart} />
            <Stack.Screen name="CheckOut" component={CheckOut} />
            <Stack.Screen name="Information" component={Information} />
            <Stack.Screen name="Address" component={Address} />
            <Stack.Screen name='ListFood' component={ListFood} />
            <Stack.Screen name='AddFood' component={AddFood} />
            <Stack.Screen name='UpdateFood' component={UpdateFood} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}


const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      // barStyle={{backgroundColor: '#DAE2B6', paddingTop:10}}
      barStyle={{backgroundColor: '#8E9288', 
      height:70}}
      initialRouteName="Home"
      activeColor="black"
      inactiveColor="white"
    >
    
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarColor: 'white',
          tabBarIcon: () => (
            <AntDesign name="home" size={28} color="black" />
          ),
        }}      
      />
       <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: '',
          tabBarColor: '#fff',
          tabBarIcon: () => (
            <MaterialIcons name="favorite-border" size={28} color="black" />
          ),
        }}
        
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={28} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Index;
