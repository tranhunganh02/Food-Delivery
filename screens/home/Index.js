import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal
} from "react-native";
import ModalFavorite from "./ModalFavorite";
import React, { useEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import { Entypo, Ionicons, Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
import a from "./a";
export default function Index({ navigation }) {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  useEffect(()=>{
    global.users={
      role:0
    }
  })
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const showSuccessMessage = (message) => {
    setModalText(message);
    setIsModalVisible(true);

    setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);
  };

  return (
    <SafeAreaView
      style={{ alignItems: "center", flex: 1, }}
    >
      {/* <SafeAreaView style={{ alignItems: "center", flex: 1, backgroundColor:'#FFFBE9'}}> */}
      <StatusBar barStyle={"dark-content"} />
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#D6DBCF",
            height: windowHeight * 0.12,
            width: windowWidth * 0.9,
            marginBottom: 25,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: 25,
            marginTop: 26,
            padding: 5,
          }}
        >
          <Avatar
            size={64}
            rounded
            source={{
              uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
            }}
          />
          <Text
            style={{
              fontWeight: "300",
              fontSize: 20,
              flex: 3,
              right: -10,
              width: "85%",
            }}
          >
            Welcome back, Pin! Order food now!!!
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            height: 60,
            width: windowWidth * 0.76,
            borderRadius: 20,
            justifyContent: "center",
          }}
        >
          <Feather
            name="search"
            size={28}
            color="black"
            style={{ position: "absolute", left: 10 }}
          />
          <TextInput
            placeholder="What are you craving"
            style={{ left: 45, color: "#3D405B" }}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: -55, width: "auto" }}
            onPress={() => {
              navigation.navigate("CartDetails");
            }}
          >
            <Ionicons name="cart-outline" size={44} color="black" />
            <View
              style={{
                backgroundColor: "red",
                position: "absolute",
                borderRadius: 35,
                borderColor: "#fff",
                borderWidth: 1,
                width:22,
                height:22,
                justifyContent:'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: "#fff" }}>{10}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: windowHeight * 0.2,
            width: windowWidth * 0.9,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 65,
            }}
          >
            <Text style={{ fontWeight: "400", fontSize: 32, color: "#3D405B" }}>
              Category
            </Text>
            <TouchableOpacity>
              <Text style={{ left: -35 }}>View all</Text>
              <AntDesign
                name="arrowright"
                size={24}
                color="#F56844"
                style={{ position: "absolute", right: 5, top: -3 }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={a.item[0].category}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    justifyContent: 'space-around',
                    alignItems: "center",
                    height: "auto",
                    borderRadius: 35,
                    width: windowWidth * 0.195,
                    marginRight: 15,
                    backgroundColor: "#fff",
                    height:windowHeight*0.124,
                    marginRight:23.5,
                    padding:6,
                    shadowColor: 'black',
                          shadowOffset: {
                            width: 0.2,
                            height: 0.2,
                          },
                          shadowOpacity:0.1,
                  }}
                >
                  <Image
                  style={{
                    height:40,
                    width:40
                  }}
                  source={{uri: item.image}}
                  ></Image>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{
            height: windowHeight * 0.43,
            width: windowWidth * 0.9,
            marginTop: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 65,
              marginBottom: 5,
            }}
          >
            <Text style={{ fontWeight: "400", fontSize: 30, color: "#3D405B" }}>
              New foods
            </Text>
            <TouchableOpacity>
              <Text style={{ left: -35 }}>View all</Text>
              <AntDesign
                name="arrowright"
                size={24}
                color="#F56844"
                style={{ position: "absolute", right: 5, top: -3 }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
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
                    });
                  }}
                  style={{
                    width: windowWidth * 0.7,
                    marginRight: 10,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    height: "auto",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: windowHeight * 0.23,
                      width: "100%",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  >
                  </Image>
                  <View
                    style={{
                      position: "absolute",
                      top:15,
                      left:20,
                      width:windowWidth*0.2,
                      height:windowHeight*0.04,
                      backgroundColor:'#fff',
                      borderRadius:30,
                      flexDirection:'row',
                      justifyContent: 'center',
                      alignItems:'center'
                    }}
                  >
                    <Text
                    style={{
                      fontWeight:"bold"
                    }}
                    >4.5</Text>
                    <Entypo name="star" size={18} color="#FFDF5C" 
                      style={{top:-1, marginLeft:3}}
                    />
                    <Text
                      style={{
                        fontSize:11,
                        color:'grey'
                      }}
                    >{'(+25)'}</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top:15,
                      right:20,
                      width:windowWidth*0.09,
                      height:windowHeight*0.04,
                      backgroundColor:'#FE724C',
                      borderRadius:30,
                      justifyContent: 'center',
                      alignItems:'center'
                    }}
                    onPress={() => {
                      showSuccessMessage('Success!')
                    }}
                  >
                    <MaterialIcons name="favorite" size={24} color="#fff" />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: "auto",
                      padding: 15,
                    }}
                  >
                    <View style={{
                      flexDirection:'row',
                      height: 30,
                      justifyContent: 'space-between',
                      alignItems:'center'
                    }}>
                      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        {item.name}
                      </Text>
                      <Text>
                        {new Intl.NumberFormat("de-DE").format(item.price)}đ
                      </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          width:windowWidth*0.24,
                          height:windowHeight*0.04,
                          marginTop:5,
                          backgroundColor:'#F6F6F6',
                          justifyContent: 'center',
                          alignItems:'center',
                          borderRadius:10,
                          shadowColor: 'black',
                          shadowOffset: {
                            width: 0.2,
                            height: 0.5,
                          },
                          shadowOpacity:0.25,
                        }}
                      >
                        <Text
                          style={{
                            color:'#8A8E9B'
                          }}
                        >PIZZA</Text>
                      </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{
            height: windowHeight * 0.43,
            width: windowWidth * 0.9,
            marginTop: 15,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 65,
              marginBottom: 5,
            }}
          >
            <Text style={{ fontWeight: "400", fontSize: 30, color: "#3D405B" }}>
              Featured
            </Text>
            <TouchableOpacity>
              <Text style={{ left: -35 }}>View all</Text>
              <AntDesign
                name="arrowright"
                size={24}
                color="#F56844"
                style={{ position: "absolute", right: 5, top: -3 }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
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
                    });
                  }}
                  style={{
                    width: windowWidth * 0.7,
                    marginRight: 10,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    height: "auto",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: windowHeight * 0.23,
                      width: "100%",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  >
                  </Image>
                  <View
                    style={{
                      position: "absolute",
                      top:15,
                      left:20,
                      width:windowWidth*0.2,
                      height:windowHeight*0.04,
                      backgroundColor:'#fff',
                      borderRadius:30,
                      flexDirection:'row',
                      justifyContent: 'center',
                      alignItems:'center'
                    }}
                  >
                    <Text
                    style={{
                      fontWeight:"bold"
                    }}
                    >4.5</Text>
                    <Entypo name="star" size={18} color="#FFDF5C" 
                      style={{top:-1, marginLeft:3}}
                    />
                    <Text
                      style={{
                        fontSize:11,
                        color:'grey'
                      }}
                    >{'(+25)'}</Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      top:15,
                      right:20,
                      width:windowWidth*0.09,
                      height:windowHeight*0.04,
                      backgroundColor:'#FE724C',
                      borderRadius:30,
                      justifyContent: 'center',
                      alignItems:'center'
                    }}
                  >
                    <MaterialIcons name="favorite" size={24} color="#fff" />
                    {/* <ModalFavorite 
                      isModalVisible={false}
                      toggleModal={toggleModal}
                      modalText={modalText}
                    /> */}
                  </View>
                  <View
                    style={{
                      height: "auto",
                      padding: 15,
                    }}
                  >
                    <View style={{
                      flexDirection:'row',
                      height: 30,
                      justifyContent: 'space-between',
                      alignItems:'center'
                    }}>
                      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        {item.name}
                      </Text>
                      <Text>
                        {new Intl.NumberFormat("de-DE").format(item.price)}đ
                      </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          width:windowWidth*0.24,
                          height:windowHeight*0.04,
                          marginTop:5,
                          backgroundColor:'#F6F6F6',
                          justifyContent: 'center',
                          alignItems:'center',
                          borderRadius:10,
                          shadowColor: 'black',
                          shadowOffset: {
                            width: 0.2,
                            height: 0.5,
                          },
                          shadowOpacity:0.25,
                        }}
                      >
                        <Text
                          style={{
                            color:'#8A8E9B'
                          }}
                        >PIZZA</Text>
                      </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
