import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { ListItem, Icon } from '@rneui/themed';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { dbStore } from '../../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
const windowWidth = Dimensions.get('window').width
export default function Item({navigation, id, name, price, image }) {
  return (
     <ListItem.Swipeable
     style={{
          height:150,
          width:windowWidth*0.87,
          justifyContent: 'center',
          marginBottom:20
     }}
     leftWidth={80}
     rightWidth={90}
     minSlideWidth={80}
     leftContent={(action) => (
       <TouchableOpacity
         style={{
           justifyContent: 'center',
           backgroundColor: '#f4f4f4',
           alignItems: 'center',
           height:'100%'
         }}
         onPress={()=>{
          
          navigation.navigate('UpdateFood',{
            id: id
          })
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
          height:"100%"
         }}
          onPress={async ()=> { await deleteDoc(doc(dbStore, "products", id )).then(()=>{
            alert("Xoa dc r, M lam modal di :))")
          }); }}
        >
           <Feather name="trash-2" size={35} color="red" />
        </TouchableOpacity>
     )}
   >
     <Image
      style={{
        height: 130,
        width: windowWidth*0.355
      }}
      source={{
        uri: image
      }}
     >

     </Image>
     <ListItem.Content>
       <ListItem.Title>{name}</ListItem.Title>
       <ListItem.Subtitle>{new Intl.NumberFormat("de-DE").format(price)} VND</ListItem.Subtitle>
     </ListItem.Content>
     <ListItem.Chevron />
   </ListItem.Swipeable>
  )
}

const styles = StyleSheet.create({})