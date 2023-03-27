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
  ScrollView
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import a from "./a";
export default function Index({ navigation }) {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1, backgroundColor:'#C9C9D0'}}>
      <ScrollView style={{  }}
        showsVerticalScrollIndicator={false}
      >
      <View
        style={{
          backgroundColor: "#F4F1DF",
          height: windowHeight * 0.15,
          width: windowWidth*0.9,
          marginBottom: 25,
          flexDirection:'row',
          justifyContent:'space-around',
          alignItems:'center',
          borderRadius: 25,
          marginTop: 35,
          padding:5
        }}
      >
        <Avatar
        size={64}
        rounded
        source={{uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'}}
        />
        <Text style={{fontWeight:'300', fontSize: 20, flex:3, right:-10, width:'85%', }}>
            Welcome back, Pin! Order food now!!!
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#ECE8E8",
          height: 60,
          width: windowWidth * 0.9,
          borderRadius: 20,
          justifyContent: "center",
        }}
      >
        <Feather
          name="search"
          size={28}
          color="black"
          style={{ position: "absolute", left: 5 }}
        />
        <TextInput
          placeholder="What are you craving"
          style={{ left: 45, color: "#3D405B" }}
        />
      </View>
      <View
        style={{
          height: windowHeight * 0.13,
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
          <Text style={{ fontWeight: "400", fontSize: 32, color:'#3D405B', }}>Category</Text>
          <TouchableOpacity>
            <Text style={{ left: -35 }}>View all</Text>
            <AntDesign
              name="arrowright"
              size={24}
              color="#65AE98"
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
                  justifyContent: "center",
                  alignItems: "center",
                  height: "auto",
                  borderWidth: 0.4,
                  borderRadius: 20,
                  width: windowWidth * 0.25,
                  marginRight: 10,
                  backgroundColor: "#fff",
                }}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          height: windowHeight * 0.49,
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
          <Text style={{ fontWeight: "400", fontSize: 30, color:'#3D405B', }}>New foods</Text>
          <TouchableOpacity>
            <Text style={{ left: -35 }}>View all</Text>
            <AntDesign
              name="arrowright"
              size={24}
              color="#65AE98"
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
                onPress={()=>{
                  navigation.navigate(
                    'ProductDetails',{
                      params:{
                        id: item.key,
                        name: item.name,
                        image: item.image,
                        price: item.price}
                    })
                }}
                style={{
                  width: windowWidth * 0.62,
                  marginRight: 10,
                  backgroundColor:'#fff',
                  borderRadius: 20,
                  height:'auto'
                }}
              >
                <Image
                 source={{ uri: item.image }}
                 style={{ height: windowHeight*0.28, width:'100%', borderTopLeftRadius: 20, borderTopRightRadius:20 }}
                ></Image>
                <View style={{flex:2, height:'auto', justifyContent:'center', padding:15, alignContent:'space-between', flexWrap:'wrap'}} >
                    <Text style={{fontWeight:'bold', fontSize:18, }}>{item.name}</Text>
                    <Text>{new Intl.NumberFormat('de-DE').format(item.price)} VND</Text>
                    <View><AntDesign name="star" size={24} color="#6CA86C" /><Text>4.5</Text></View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          height: windowHeight * 0.49,
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
          <Text style={{ fontWeight: "400", fontSize: 30, color:'#3D405B', }}>Featured</Text>
          <TouchableOpacity>
            <Text style={{ left: -35 }}>View all</Text>
            <AntDesign
              name="arrowright"
              size={24}
              color="#65AE98"
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
                onPress={()=>{
                  navigation.navigate(
                    'ProductDetails',{
                      params:{
                        id: item.key,
                        name: item.name,
                        image: item.image,
                        price: item.price}
                    })
                }}
                style={{
                  width: windowWidth * 0.62,
                  marginRight: 10,
                  backgroundColor:'#fff',
                  borderRadius: 20,
                  height:'auto'
                }}
              >
                <Image
                 source={{ uri: item.image }}
                 style={{ height: windowHeight*0.28, width:'100%', borderTopLeftRadius: 20, borderTopRightRadius:20 }}
                ></Image>
                <View style={{flex:2, height:'auto', justifyContent:'center', padding:10, alignContent:'space-between', flexWrap:'wrap'}} >
                    <Text style={{fontWeight:'bold', fontSize:18, }}>{item.name}</Text>
                    <Text>{new Intl.NumberFormat('de-DE').format(item.price)} VND</Text>
                    <View><AntDesign name="star" size={24} color="#6CA86C" /><Text>4.5</Text></View>
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
