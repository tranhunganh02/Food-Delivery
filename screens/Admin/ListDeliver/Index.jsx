import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Dialog } from "@rneui/themed";
import { Feather, Ionicons } from "@expo/vector-icons";
import Item from "./Item";
import a from "./a.json";
import { useEffect } from "react";
import getListUser from "../../../features/User/getListUser";
export default function Index({navigation}) {
  const [listNew, setListnew] = useState(["a", "a"]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delivers,setDelivers] = useState([]);
  const [users,setUsers] = useState([]);
  useEffect(()=>
  {
    getListUser(2).then((data)=>{
      setDelivers(data);
    })
    getListUser(0).then((data)=>{
      setUsers(data);
    })
  },[])
  return (
    <View style={{ flex: 1, paddingTop: 35 }}>
      <View
        style={{
          height: 100,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={()=>{
               navigation.goBack()
          }}
        >
          <Ionicons name="arrow-back-sharp" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: "500" }}>List Deliver</Text>
        <TouchableOpacity
        onPress={()=>{setIsModalVisible(!isModalVisible)}}
        >
          <Feather name="user-plus" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          {listNew != null ? (
            <>
            <View style={styles.modalView}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                data={users}
                renderItem={({ item }) => {
                  return <Item item={item} type={"add"} />;
                }}
              />
              </View>
              <Button style={styles.button} color="grey"
               onPress={()=>{
                    setIsModalVisible(!isModalVisible)
               }}
              >Close</Button>
            </>
          ) : (
            <>
              <Text>Null</Text>
            </>
          )}
        </View>
      </Modal>
      <View style={{ width: "100%" }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          data={delivers}
          renderItem={({ item }) => {
            return <Item item={item} type={"delete"} />;
          }}
        />
      </View>
    </View>
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
       padding: 20,
       alignItems: "center",
       shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 4,
       flexDirection: "row",
       justifyContent: "space-around",
       alignItems: "center",
       width: "90%",
     },
     button: {
       borderRadius: 20,
       padding: 10,
       elevation: 2,
     },
     buttonClose: {
       backgroundColor: "grey",
     },
   });