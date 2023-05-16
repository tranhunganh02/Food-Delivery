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
  Modal,
} from "react-native";
import { FAB } from "@rneui/themed";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import ItemComment from "./ItemComment";
import comment from "./comment";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function ProductDetails({ navigation, route }) {
  const [quantity, setQuantity] = useState(0 * 0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  useEffect(() => {
    setQuantity(0);
console.log(comment.item[0].comment[0]);
  }, [route.params.id]);

  function addToCart() {
      setLoadingVisible(true)
      setTimeout(() => {
        setLoadingVisible(false);
        setIsModalVisible(true)
        setTimeout(()=>{
          setIsModalVisible(false)
  
        }, 1500)
      }, 2000);
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "#FBF9F9" }}
    >
      <StatusBar barStyle={"dark-content"} />
      {/* Animation */}
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
          visible={isModalVisible}
        >
          <TouchableOpacity
            style={styles.centeredView}
            onPress={() => setIsModalVisible(!isModalVisible)}
          >
            <View
              style={[
                styles.modalView,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: windowWidth * 0.398,
                },
              ]}
            >
              <Text style={styles.modalText}>Success</Text>
              <AntDesign name="checkcircle" size={37} color="green" />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
      <View style={{ height: "auto", width: windowWidth }}>
        <View
          style={{
            height: windowHeight * 0.12,
            width: windowWidth,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            alignItems: "center",
            top: -25,
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
              shadowOpacity: 0.2,
              shadowRadius: 50,
              shadowOffset: {
                height: 0.5,
                width: 0.5,
              },
              backgroundColor: "#fff",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 300 }}>Food Details</Text>
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
              backgroundColor: "#fff",
            }}
          >
            <MaterialIcons name="favorite" size={30} color="#FE724C" />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            width: "100%",
            height: windowHeight * 0.28,
            bottom: 50,
          }}
          source={{ uri: route.params.image }}
        ></Image>
      </View>
      <View style={styles.InformationContainer}>
        <View style={styles.informationHeader}>
          <Text
            style={{ fontWeight: "300", flexDirection: "row", fontSize: 37 }}
          >
            {route.params.name}
          </Text>
          <View style={{ marginRight: 5, marginTop:4 }}>
            <TouchableOpacity style={{height:47,  justifyContent:'space-around', alignItems:'center', width:windowWidth*0.15, flexDirection:'row-reverse'}}>
            <Text>
             3.8
            </Text>
            <Entypo name="star" size={23} color="#DECE44" /> 
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.informationFooter}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 24,
            }}
          >
            {" "}
            {new Intl.NumberFormat("de-DE").format(route.params.price)} VND
          </Text>
          <View
            style={{
              width: windowWidth * 0.26,
              height: windowHeight * 0.05,
              flexDirection: "row",

              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 30,
              }}
              onPress={() => {
                if (quantity > 1) setQuantity(quantity - 1);
              }}
            >
              <AntDesign name="minuscircleo" size={30} color="#FE724C" />
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                setQuantity(quantity + 1);
              }}
            >
              <AntDesign name="pluscircle" size={30} color="#FE724C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
     
      <View style={styles.commentContainer}>
          <View style={{height:45, justifyContent:'center', alignItems:'center'}}> 
            <Text style={{fontWeight:'500', fontSize:20}}>Comment</Text>
          </View>
          <View>
            <FlatList
             data={comment.item[0].comment}
             renderItem={({item, index})=>{
              return(
                <ItemComment key={index} avatar={item.avatar} name={item.name} content={item.content} vote={item.vote}   />
              )
             }}
            />
          </View>
      </View>
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
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            addToCart();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {},
  Image: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  InformationContainer: {
    width: windowWidth,
    height: windowHeight * 0.195,
    bottom: 50,
    padding: 25,
    borderBottomWidth: 0.3,
    borderColor: "A9A9A9",
    justifyContent: "center",
    
  },
  informationHeader: {
    height: "48%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 35,
  },
  informationFooter: {
    height: "49%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  commentContainer: {
    width: windowWidth,
    height: 300,
    padding: 15,
    top: -50,
  },
  otherDishesContainerCart: {
    backgroundColor: "#FE724C",
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
    backgroundColor: "#FE724C",
    justifyContent: "center",
    alignItems: "center",
  },
});
