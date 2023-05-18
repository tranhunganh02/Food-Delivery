import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { ListItem, Avatar, Button, Dialog } from "@rneui/themed";
import changeRole from "../../../features/User/changeRole";
import { useNavigation } from "@react-navigation/native";
export default function Item({ item, type }) {
  const [visible1, setVisible1] = useState(false);
  const toggleDialog = () => {
    setVisible1(!visible1);
  };
  const navigation = useNavigation();
  function Delete() {
    setVisible1(true);
    setTimeout(() => {
      setVisible1(false);
      changeRole({idUser:item.id, role : 0})
      Alert.alert("Success","Remove " + item.name + " from Deliver list");
      navigation.navigate("Profile");
    }, 2000);
  }
  function Add() {
    setVisible1(true);
    setTimeout(() => {
      setVisible1(false);
      changeRole({idUser:item.id, role : 2})
      Alert.alert("Success","Add " + item.name + " to Deliver list");
      navigation.navigate("Profile");
    }, 2000);
  }
  return (
    <>
      <Dialog isVisible={visible1} onBackdropPress={toggleDialog}>
        <Dialog.Loading />
      </Dialog>
      <ListItem
        bottomDividerv
        containerStyle={{
          height: 120,
          marginBottom: 10,
          paddingHorizontal: 15,
          borderWidth:0.2
        }}
      >
        <Avatar
          rounded
          source={{
            uri: item.image ? item.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3R_8hlZCdl3FOthlfWXOOLlf3Ngqp6sQvtXQhSs&s',
          }}
          size={100}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.provider}</ListItem.Subtitle>
        </ListItem.Content>
        {type == "delete" ? (
          <Button
            onPress={() => {
              Delete();
            }}
            title="Delete"
            icon={{
              name: "trash",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "red",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 100,
              marginVertical: 10,
            }}
          />
        ) : (
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Button
          onPress={() => {
            Add();
          }}
          title="Add"
          icon={{
            name: "plus",
            type: "font-awesome",
            size: 12,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#90F28D",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 70,
          }}
        />
        
          </View>
        )}
      </ListItem>
    </>
  );
}
