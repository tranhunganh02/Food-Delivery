import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { useEffect } from "react";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const Item = ({
  id,
  name, quantity, price, image
  
}) => {
    const [product,setProduct] = useState({});
    useEffect(()=> 
    {
     //    getProduct(id).then((data) =>
     //    setProduct(data))
    },[])
    
  // const [getQuantity, setQuantity] = useState(quantity);
  // const getPrice = (priceProduct,quantityProduct) => {
  //   return priceProduct*quantityProduct;
  // }

  
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: "#B7B7B7",
        height: windowHeight * 0.2,
        width: "98%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom:20
      }}
    >
      <View
        style={{
          height: "80%",
          width: "40%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "400" }}> {name}</Text>
        <Text>{new Intl.NumberFormat("de-DE").format(price)} VND</Text>
      </View>
      <View
        style={{
          height: "80%",
          width: "45%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Quantity: {quantity}</Text>
        <Image
          source={{ uri: image }}
          style={{
            height: windowHeight * 0.1,
            width: "90%",
            borderRadius: 2,
          }}
        ></Image>
      </View>
    </View>
  );

 
};

const styles = StyleSheet.create({
  foodButton: {
    padding: 4,
    borderWidth: 0.4,
    borderColor: "#E2E2E2",
    marginHorizontal:5
  },
});

export default Item;
