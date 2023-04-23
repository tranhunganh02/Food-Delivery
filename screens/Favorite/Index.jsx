import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import ItemFavorite from "./Item";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import a from "../home/a";
import { FAB } from "@rneui/themed";
export default function Index(navigation) {
  const [listFavorite, setListFavorite] = useState(a.item[1].product);
  //const [checked, setChecked] = React.useRef({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleAccept, setIsModalVisibleAccept] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [chooseOptionDelete, setChooseOptionDelete] = useState();
  const chooseDeleteItem = () => {
    chooseOptionDelete != 0 ? setChooseOptionDelete(0) : null;
    setIsModalVisible(true);
  };
  const chooseDeleteAllItem = () => {
    setChooseOptionDelete(1);
    setIsModalVisible(true);
  };
  const accepctDelete = (choose) => {
    choose != 1
      ? console.log("function del 1 item")
      : console.log("function del all item");

    setLoadingVisible(true);
    setIsModalVisible(false);
    setTimeout(() => {
      setLoadingVisible(false);
      showDeleteSuccess()
    }, 2000);
  };
  const showDeleteSuccess = () => {
    setIsModalVisibleAccept(true)
    setTimeout(() => {
      setIsModalVisibleAccept(false);
    }, 1500);
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: windowHeight * 0.1,
          width: "100%",
          backgroundColor: "#D6DBCF",
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View stylest={{ height: 10, width: 35 }}>
          <Text> </Text>
        </View>
        <Text style={{ fontWeight: "500", fontSize: 17 }}>FAVORITE</Text>
        <TouchableOpacity onPress={() => chooseDeleteAllItem()}>
          <Entypo name="dots-three-vertical" size={26} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {chooseOptionDelete === 0
                ? "Delete this item??"
                : "Delete all item??"}
            </Text>
            <View style={styles.modalViewButton}>
              {chooseOptionDelete === 0 ? (
                <TouchableOpacity
                  // delete 1 item
                  onPress={() => accepctDelete(0)}
                >
                  <AntDesign name="checkcircle" size={50} color="red" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  //
                  onPress={() => accepctDelete(1)}
                >
                  <AntDesign name="checkcircle" size={45} color="red" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => setIsModalVisible(!isModalVisible)}
              >
                <MaterialIcons name="cancel" size={56} color="#585454" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {loadingVisible ? (
        <Modal animationType="fade" transparent={true} visible={loadingVisible}>
          <View style={styles.centeredView}>
            <FAB
              loading={loadingVisible}
              visible={loadingVisible}
              icon={{ name: "add", color: "white" }}
              color="green"
            />
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisibleAccept}
        >
          <View style={styles.centeredView}  onPress={() => setIsModalVisibleAccept(!isModalVisibleAccept)}>
            <View style={[styles.modalView,{flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:windowWidth*0.38} ]}>
              <Text style={styles.modalText}>
               Success
              </Text>
              <AntDesign name="checkcircle" size={37} color="green" />
            </View>
          </View>
        </Modal>
      )}
      <ScrollView
        style={{
          width: "95%",
          height: windowHeight * 0.4,
        }}
        showsVerticalScrollIndicator={false}
      >
        {listFavorite.map((item, index) => (
          <ItemFavorite
            navigation={navigation}
            key={index}
            name={item.name}
            id={item.id}
            price={item.price}
            image={item.image}
            deleteItem={chooseDeleteItem}
            //checked={checked[0]}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    width: windowWidth * 0.48,
  },
  modalViewButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: windowWidth * 0.3,
    marginTop:15
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    
  },
  buttonAccept: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});
