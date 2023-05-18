import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import Home from './screens/home/Index';
import Logo from './screens/Amination/Logo';
import Product from './screens/Product/ProductDetails';
import Profile from './screens/Profile/Index';
import Information from './screens/Profile/Information/Index';
import Chat from './screens/Profile/Chat/Index'
import Address from './screens/Profile/Address/Index';
import CreateAddress from './screens/Profile/Address/CreateAddress.js';
import UpdateAddress from './screens/Profile/Address/UpdateAddress';
import Favorite from './screens/Favorite/Index';
import Order from './screens/Profile/Order/Index'
import SignIn from './screens/Auth/SignIn';
import SignUp from './screens/Auth/SignUp';
import Cart from './screens/Cart/Index';
import CheckOut from './screens/Checkout/Index';
import AddFood  from './screens/Admin/FoodCRUD/AddFood'
import ListFood  from './screens/Admin/FoodCRUD/ListFood'
import UpdateFood from './screens/Admin/FoodCRUD/UpdateFood'
import ListChat from './screens/Admin/Chat/ListChat'
import ChatCustomer from './screens/Admin/Chat/Chat'
import ListDeliver from "./screens/Admin/ListDeliver/Index"
import AllProduct from './screens/Product/Index';
import Item from './screens/Product/item';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Index = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomTab" screenOptions={{headerShown: false}}>
        <Stack.Screen name="null" component={Item}  />
            <Stack.Screen name="SignIn" component={SignIn}  />
            <Stack.Screen name="SignUp" component={SignUp}  />
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Logo" component={Logo}   options={{presentation: 'fullScreenModal'}}     />
            <Stack.Screen name="ProductDetails" component={Product} />
            <Stack.Screen name="CartDetails" component={Cart} />
            <Stack.Screen name="CheckOut" component={CheckOut} />
            <Stack.Screen name="Information" component={Information} />
            <Stack.Screen name="Address" component={Address} />
            <Stack.Screen name="Favorite" component={Favorite} />
            <Stack.Screen name="Create Address" component={CreateAddress} />
            <Stack.Screen name="Update Address" component={UpdateAddress} />
            <Stack.Screen name='ListFood' component={ListFood} />
            <Stack.Screen name='AddFood' component={AddFood} />
            <Stack.Screen name='UpdateFood' component={UpdateFood} />
            <Stack.Screen name='Chat' component={Chat} />
            <Stack.Screen name='Support' component={ListChat} />
            <Stack.Screen name='ChatCustomer' component={ChatCustomer} />
            <Stack.Screen name='Order' component={Order} />
            <Stack.Screen name='ListDeliver' component={ListDeliver} />
            <Stack.Screen name="Favorite" component={Favorite} />
            <Stack.Screen name="AllProduct" component={AllProduct} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  return (
    
    <Tab.Navigator
      // barStyle={{backgroundColor: '#DAE2B6', paddingTop:10}}
      barStyle={{backgroundColor: '#8E9288', 
      height:70}}
      initialRouteName="Home"
      activeColor="black"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'white',
          tabBarIcon: () => (
            <AntDesign name="home" size={25} color="black" />
          ),
        }}      
      />
      <Tab.Screen
        name="AllProduct"
        component={AllProduct}
        options={{
          tabBarLabel: 'Food',
          tabBarColor: 'white',
          tabBarIcon: () => (
            <Ionicons name="md-fast-food-outline" size={24} color="black" />
          ),
        }}      
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={25} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Index;