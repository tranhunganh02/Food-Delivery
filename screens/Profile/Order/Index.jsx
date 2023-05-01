import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Delivery from './Delivery';
import OrderHistory from './OrderHistory';
import { Ionicons } from '@expo/vector-icons';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    initialRouteName='Delivery'
    screenOptions={{
     tabBarAccessibilityLabel:'black'
    }}
    >
      {/* <Tab.Screen name="Confirmation" component={OrderConfirmation} /> */}
      <Tab.Screen name="Delivery" component={Delivery} />
      <Tab.Screen name="OrderHistory" component={OrderHistory} />
    </Tab.Navigator>
  );
}
export default function Index({navigation}) {
  return (
    <SafeAreaView style={{
     flex:1,
     marginTop:25
    }}>
     <View style={{flexDirection:'row', width:'60%', padding:10, paddingHorizontal:20, justifyContent:'space-between', alignItems:'center'}}>
          <TouchableOpacity  onPress={() => {
              navigation.goBack();
            }}>
          <Ionicons name="arrow-back-sharp" size={30} color="black" />
          </TouchableOpacity>
          <View><Text style={{fontSize:18, fontWeight:'500'}}>Order</Text></View>
     </View>
      <MyTabs />
    </SafeAreaView>
  )
}