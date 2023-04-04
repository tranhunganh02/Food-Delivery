import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons, MaterialIcons,Entypo,AntDesign, FontAwesome } from "@expo/vector-icons";
import a from "../home/a";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Index({ navigation, route }) {
  const [quantity, setQuantity] = useState(0*0);

  useEffect(()=>{
    setQuantity(0)
  },[route.params.id])
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor:'#FBF9F9' }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={{ height: "auto", width: windowWidth }}>
        <View
          style={{
            height: windowHeight * 0.178,
            width: windowWidth,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            alignItems: "center",
            top:-25
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              width: windowWidth * 0.13,
              height: windowHeight * 0.06,
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowRadius: 50,
              shadowOffset: {
                height: 0.5,
                width: 0.5,
              },
              backgroundColor:'#fff'
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 300 }}>
            Food Details
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              width: windowWidth * 0.13,
              height: windowHeight * 0.06,
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowRadius: 50,
              shadowOffset: {
                height: 0.5,
                width: 0.5,
              },
              backgroundColor:'#fff'
            }}
          >
            <MaterialIcons name="favorite" size={30} color="red" />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            width: "100%",
            height: windowHeight * 0.33,
            bottom: 50,
          }}
          source={{ uri: route.params.image }}
        ></Image>
      </View>
      <View style={styles.InformationContainer}>
        <View style={styles.informationHeader}>
          <Text style={{fontWeight:'300', writingDirection:'ltr', fontSize:37}}>
            {route.params.name}
          </Text>
          <View style={{marginRight:5}}>
            <Text>
              <Entypo name="star" size={26} color="#DECE44" /> 3.8
            </Text>
          </View>
        </View>
        <View style={styles.informationFooter}>
          <Text 
          style={{
            fontWeight:'500',
            fontSize:24
          }}
          > {new Intl.NumberFormat("de-DE").format(
            route.params.price 
          )} VND</Text>
          <View
            style={{
              width: windowWidth * 0.26,
              height: windowHeight * 0.05,
              flexDirection: "row",
              borderWidth: 0.45,
              borderRadius:20,
              borderColor:'#BFBFBF',
              justifyContent:'space-around',
              alignItems :'center',
            }}
          >
            <TouchableOpacity
              onPress={()=>{
                setQuantity(quantity+1)
              }}
            >
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity
              onPress={()=>{
                if(quantity>1)
                setQuantity(quantity-1)
              }}
            >
              <AntDesign name="minus" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.otherDishesContainer}
        showsHorizontalScrollIndicator={false}
        data={a.item[1].product}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProductDetails", {
                  id: item.key,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  number:1
                });
              }}
              style={{
                width: "auto",
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
                source={{ uri: item.image }}
                style={{
                  height: windowHeight * 0.13,
                  width: windowWidth * 0.335,
                  borderRadius: 20,
                }}
              ></Image>
              <View>
                <Text>{item.name}</Text>
                <Text>
                  {new Intl.NumberFormat("de-DE").format(item.price)} VND
                </Text>
              </View>
              <TouchableOpacity style={styles.otherDishesContainerCart}>
                <FontAwesome name="cart-plus" size={30} color="black" />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: "column", width: windowWidth * 0.32 }}>
          <Text
            style={{
              color: "#000",
              fontSize: 20,
            }}
          >
            Total price
          </Text>
          <Text>
            {new Intl.NumberFormat("de-DE").format(
              route.params.price * quantity
            )}{" "}
            VND
          </Text>
        </View>
        <TouchableOpacity style={styles.bottomButton}
          onPress={()=>{
            navigation.navigate('CartDetails')
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Add to  cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {},
  Image: {},
  InformationContainer: {
    width: windowWidth,
    height: windowHeight * 0.18,
    bottom: 50,
    padding: 25,
    borderBottomWidth: 0.3,
    borderColor: "A9A9A9",
    justifyContent:'center'
  },
  informationHeader:{
    height: "48%",
    width:'100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginBottom:35
  },
  informationFooter:{
    height: "46%",
    width:'100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  otherDishesContainer: {
    width: windowWidth,
    height: 300,
    padding: 15,
    top: -50,
  },
  otherDishesContainerCart: {
    backgroundColor: "#C9FA26",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.13,
    height: windowHeight * 0.05,
    borderRadius: 10,
    marginRight: 20,
  },
  bottomContainer: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.9277,
    position: "absolute",
    bottom: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  bottomButton: {
    borderRadius: 45,
    width: windowWidth * 0.33,
    height: windowHeight * 0.07,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
