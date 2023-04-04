import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { ListItem, Icon } from '@rneui/themed';
import { Feather, MaterialIcons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width
export default function ItemAddress({navigation, id, name, phoneNumber, adress, city, district, ward, specificAddress}) {
  return (
     <ListItem.Swipeable
     style={{
          width:windowWidth*0.9,
          justifyContent: 'center',
          marginBottom:10
     }}
     leftWidth={100}
     rightWidth={100}
     minSlideWidth={100}
     leftContent={(action) => (
       <TouchableOpacity
         style={{
           justifyContent: 'center',
           backgroundColor: '#f4f4f4',
           alignItems: 'center',
           height:100
         }}
         onPress={()=>{
          
          // navigation.navigate('UpdateFood')
         }}
       >
         <MaterialIcons name="system-update-alt" size={24} color="black" />
       </TouchableOpacity>
     )}
     rightContent={(action) => (
          <TouchableOpacity
         style={{
          justifyContent: 'center',
          backgroundColor: '#f4f4f4',
          alignItems: 'center',
          height:100
         }}
          onPress={action}
        >
           <Feather name="trash-2" size={35} color="red" />
        </TouchableOpacity>
     )}
   >
     <ListItem.Content>
       <ListItem.Title>{name} | (+84) {phoneNumber}
       </ListItem.Title>
       <ListItem.Subtitle>
          {specificAddress} , {ward} , {district}
       </ListItem.Subtitle>
     </ListItem.Content>
     <ListItem.Chevron />
   </ListItem.Swipeable>
  )
}

const styles = StyleSheet.create({})