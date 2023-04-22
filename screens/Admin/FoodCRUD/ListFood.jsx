import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal
} from "react-native";
import {
  Ionicons,
  Entypo,
  AntDesign,
  MaterialIcons
} from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import Item from "./Item";
import a from "../../home/a.js";
import { FAB } from "@rneui/themed";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const List = ({ navigation }) => {
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [listFood, setListFood] = useState(a.item[2].product);
  const [modalVisible, setModalVisible] = useState(false);
  const deleteItem = ()=>{
    setLoadingVisible(!loadingVisible)
    setTimeout(() => {
      setLoadingVisible(false)   
      setModalVisible(true)   
      setTimeout(()=>{
        setModalVisible(false)
      },3000)     
   }, 2000);
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
      }}
    >
      
      <StatusBar barStyle={"dark-content"} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Delete success!</Text>
            <MaterialIcons
                  name="library-add-check"
                  size={35}
                  color="green"
                />
          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text>List Food</Text>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { justifyContent: "center", alignItems: "center" },
          ]}
          onPress={() => {
            navigation.navigate("AddFood");
          }}
        >
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          height: windowHeight * 0.35,
          width: windowWidth * 0.85,
        }}
      >
        {listFood.map((item, index) => (
          <Item
            navigation={navigation}
            key={index}
            id={item.key}
            name={item.name}
            price={item.price}
            image={item.image}
            quantity={item.quantity}
            onPress={deleteItem}
          />
        ))}
      </ScrollView>
      <FAB
        color="green"
        loading
        visible={loadingVisible}
        size="large"
        style={{
          position: "absolute",
        }}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  headerContainer: {
    height: windowHeight * 0.145,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:windowWidth*0.7,
  },
});
