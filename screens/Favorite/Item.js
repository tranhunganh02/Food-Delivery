import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { ListItem, Icon } from '@rneui/themed';
import { Feather, MaterialIcons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
export default function ItemFavorite({navigation, id, name, price, image, deleteItem}) {
  return (
     <ListItem.Swipeable
     style={{
          width:'100%',
          justifyContent: 'center',
          marginBottom:10,
          height:'auto',
          backgroundColor:'#fff'
     }}
     rightWidth={120}
     minSlideWidth={100}
     rightContent={(action) => (
          <TouchableOpacity
         style={{
          justifyContent: 'center',
          backgroundColor: '#f4f4f4',
          alignItems: 'center',
          height:windowHeight*0.16
         }}
          onPress={deleteItem}
        >
           <Feather name="trash-2" size={35} color="red" />
        </TouchableOpacity>
     )}
   >
    
     <Image source={{uri:`${image}`}} style={{height:windowHeight*0.162, width:windowWidth*0.55}}></Image>
     <ListItem.Content style={{height:70, justifyContent:'space-between'}}>
       <ListItem.Title>{name}
       </ListItem.Title>
       <ListItem.Subtitle>
          {price} 
       </ListItem.Subtitle>
       
     </ListItem.Content>
   
   </ListItem.Swipeable>
  )
}
