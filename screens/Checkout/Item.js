import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
const Item = ({
  id,
  name,
  quantity,
  price,
  image,
  windowHeight,
  windowWidth,
  deleteSelectedElement,
}) => {
  const [getQuantity, setQuantity] = useState(quantity);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#FDFDFD",
        borderRadius: 10,
        height: "auto",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight:10
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          height: windowHeight * 0.115,
          width: windowWidth * 0.335,
          borderRadius: 10,
        }}
      ></Image>
      <View style={{
          justifyContent:'space-around',
          height:60
      }}>
        <Text>{name}</Text>
        <Text style={{fontWeight:'600'}}>{new Intl.NumberFormat("de-DE").format(price)} VND</Text>
      </View>
      <View style={{alignItems:'center'}}>
        <Text>Quantity: {getQuantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodButton: {
    padding: 4,
    borderWidth: 0.4,
    borderColor: "#E2E2E2",
    borderRadius:10,
    marginHorizontal:5
  },
});

export default Item;
