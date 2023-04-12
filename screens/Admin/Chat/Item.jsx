import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from '@rneui/base'
const Item = ({id, chatName, enterChat, photoURL, idRoom}) => {
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName, photoURL, idRoom)}
    style={{marginBottom:5}}
    >
      {
          photoURL ? 
          (
               <Avatar
               size={55}
                rounded
                source={{
                  uri: photoURL 
                }}
              ></Avatar>
          ):
          (
               <Avatar
               size={55}
                rounded
                source={require('../../../assets/avatar/avatarNull.png')}
              ></Avatar>
          )
      }
      <ListItem.Content>
        <ListItem.Title>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="clip">
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default Item
