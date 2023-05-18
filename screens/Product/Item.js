import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import FastImage from "react-native-fast-image";
import { CheckBox } from "react-native-elements";
import { useEffect } from "react";
import getProduct from "../../features/Product/getProduct";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const Item = ({
  id,
  quantity,
  
}) => {
    const [product,setProduct] = useState({});
    useEffect(()=> 
    {
        getProduct(id).then((data) =>
        setProduct(data))
    },[])
    
  const [getQuantity, setQuantity] = useState(quantity);
  const getPrice = (priceProduct,quantityProduct) => {
    return priceProduct*quantityProduct;
  }

  
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#FDFDFD",
        height: "auto",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding:20,
        paddingLeft:10        
      }}
    >
      <Image
        source={{ uri: product.image}}
        style={{
          height: windowHeight * 0.115,
          width: windowWidth * 0.335,
        }}
      />
      <View style={{flexWrap: "wrap",flexDirection:"column"}}>

      
        <View style={{marginLeft:40,marginTop:10}}>
          <Text>{product.name}</Text>
          <Text style={{fontWeight:'600',paddingTop:10,color:'#F56844'}}>{new Intl.NumberFormat("de-DE").format(getPrice(product.price,quantity))} VND</Text>
        </View>
        <View style={{alignItems:'center',flexDirection:'row',padding:10}}>
          {/* <Text style={{padding: 10}}>{getQuantity}</Text> */}
         
          
        </View>
      </View>
      {/* <TouchableOpacity
      //  onPress={() => deleteSelectedElement(id, name)}
      style={{
        right:10,
        padding:10,
      }}
      >
        <Ionicons name="trash-bin" size={24} color="red" />
      </TouchableOpacity> */}
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
