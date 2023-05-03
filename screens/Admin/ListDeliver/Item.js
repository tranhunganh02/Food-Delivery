import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { ListItem, Avatar, Button, Dialog } from "@rneui/themed";
export default function Item({ item, type }) {
  const [visible1, setVisible1] = useState(false);
  const toggleDialog = () => {
    setVisible1(!visible1);
  };
  function Delete() {
    setVisible1(true);
    setTimeout(() => {
      setVisible1(false);
      Alert.alert("Success");
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
            uri: "https://randomuser.me/api/portraits/men/36.jpg",
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
            Delete();
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
        <Button
            onPress={() => {
              Delete();
            }}
            title="Del"
            icon={{
              name: "trash",
              type: "font-awesome",
              size: 12,
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
              width: 70,
              marginVertical: 4,
            }}
          />
          </View>
        )}
      </ListItem>
    </>
  );
}
