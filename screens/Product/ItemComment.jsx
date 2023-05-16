import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Card, Icon, Avatar, ListItem } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
const ItemComment = ({ avatar, name, content, vote }) => {
  useEffect(() => {
    console.log(name);
  });
  return (
    <>
      <ListItem bottomDivider>
        <Avatar
          rounded
          size={50}
          source={{
            uri: avatar
              ? avatar
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTplwCeJGmwbtOp4aCavW2_ICZWoa8fVJ7FBfr2mq9MDA&s",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>
            <View
              style={{
                flexDirection: "row",
                justifyContent:'space-between',    
                alignContent: "space-between",
                width:'90%',
              }}
            >
              <Text>{name}</Text>
              <View style={{ flexDirection: "row", alignContent:'space-around' }}>
                <Text>Vote {vote} </Text>
                <AntDesign name="star" size={24} color="#ACD175" style={{top:-5}}/>
              </View>
            </View>
          </ListItem.Title>
          <ListItem.Subtitle>{content}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

export default ItemComment;
