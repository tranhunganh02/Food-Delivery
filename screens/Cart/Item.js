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
        borderRadius: 20,
        height: "auto",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          height: windowHeight * 0.115,
          width: windowWidth * 0.335,
          borderRadius: 20,
        }}
      ></Image>
      <View style={{}}>
        <Text>{name}</Text>
        <Text style={{fontWeight:'600'}}>{new Intl.NumberFormat("de-DE").format(price)} VND</Text>
      </View>
      <View style={{alignItems:'center'}}>
        <TouchableOpacity
          style={styles.foodButton}
          onPress={() => {
            setQuantity(getQuantity + 1);
          }}
        >
          <AntDesign name="plus" size={20} color="black" />
        </TouchableOpacity>
        <Text>{getQuantity}</Text>
        <TouchableOpacity
          style={styles.foodButton}
          onPress={() => {
            if (getQuantity > 1) setQuantity(getQuantity - 1);
          }}
        >
          <AntDesign name="minus" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
      //  onPress={() => deleteSelectedElement(id, name)}
      style={{
        right:10,
        padding:10,
      }}
      >
        <Ionicons name="trash-bin" size={24} color="red" />
      </TouchableOpacity>
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
