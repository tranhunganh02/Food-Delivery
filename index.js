import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import Auth from './screens/auth/Index';
import Home from './screens/home/Index';
import Logo from './screens/Amination/Logo';
const Stack = createNativeStackNavigator();

const Index = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Logo" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Auth" component={Auth}  />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Logo" component={Logo} />
        </Stack.Navigator>
    </NavigationContainer>
  )
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
