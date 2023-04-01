import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  SwipeView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import a from "../home/a";
import Item from "./Item";
const Index = ({ navigation }) => {
  // const [TEMP_DATA, setTEMP_DATA] = useState(a.item[2].product);
  // const deleteSelectedElement = (id, name) => {

  //      alert(
  //        'Are You Sure Want To Delete Item = ' + name.toUpperCase(),
  //        'Select Below Options',
  //        [
  //          { text: 'Cancel', onPress: () => { }, style: 'cancel' },
  //          {
  //            text: 'OK', onPress: () => {
  //              // Filter Data
  //              const filteredData = TEMP_DATA.filter(item => item.id !== id);
  //              //Updating List Data State with NEW Data.
  //              setTEMP_DATA(filteredData);
  //            }
  //          },
  //        ])
  //    }
  const [getTotal, setTotal] = useState(0);
  const getTotolFood = () => {
    for (var key in a.item[2].product) {
      setTotal(getTotal + key.price);
    }
  };
  useEffect(() => {
    getTotolFood();
  }, [a]);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical:5
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text>Cart Details</Text>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.FoodContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={a.item[2].product}
          renderItem={({ item }) => {
            return (
              <Item
                id={item.key}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                windowHeight={windowHeight}
                windowWidth={windowWidth} //deleteSelectedElement={deleteSelectedElement}
              />
            );
          }}
        ></FlatList>
      </View>
      <View style={styles.checkOutContainer}>
        <View style={styles.checkOutTotal}>
          <Text style={{ fontWeight: "400", fontSize: 15 }}>Price</Text>
          <Text>{getTotal} VND</Text>
        </View>
        <TouchableOpacity style={styles.checkOutButton}
          onPress={() =>{
            navigation.navigate('CheckOut')
          }}
        >
          <Text style={{ color:'#fff' }}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  headerContainer: {
    height: windowHeight * 0.145,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: windowWidth * 0.13,
    height: windowHeight * 0.06,
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 50,
    shadowOffset: {
      height: 0.5,
      width: 0.5,
    },
  },
  FoodContainer: {
    height: windowHeight * 0.65,
    width: "100%",
  },
  checkOutContainer: {
    height: windowHeight * 0.13,
    width: windowWidth,
    backgroundColor: "#fff",
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems: 'center',
  },
  checkOutTotal: {
    height: windowHeight*0.1,
    width: windowWidth*0.2,
    justifyContent: "center",
    alignContent: "flex-start",
    paddingLeft: 30,
  },
  checkOutButton: {
    width: windowWidth*0.41,
    height: windowHeight*0.085,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:40
  },
});
