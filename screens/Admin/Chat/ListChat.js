import { Modal, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dbRealTime, writeUserData, dbFireStore, auth } from '../../../firebase';
import { doc, collection, query, onSnapshot, where } from 'firebase/firestore';
import { Avatar } from '@rneui/themed';
import { Feather } from '@expo/vector-icons';
import Item from './Item'
import { async } from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
const Home = ({ navigation }) => {

  const [listChats, setListChats] = useState([]);

  const collectionRef = collection(dbFireStore, 'users' );

  useEffect(() => {
    const q = query(collectionRef,  where("role", "!=", 1));
    const unsubscribe = onSnapshot(q, snapshot => {
             setListChats(
               snapshot.docs.map(doc => ({
                 id:doc.id,
                 name: doc.data().name,
                 photoURL: doc.data().image,
               }))
             )
           })
    return  unsubscribe;
  }, [])
  const enterChat = (id, chatName, photoURL, idRoom) => {
    navigation.navigate('ChatCustomer', {
      id,
      chatName,
      photoURL,
      idRoom
    })
  }

  return (
    <SafeAreaView style={{
      paddingVertical:10
    }}> 
        <View style={{
          height: 65,
          backgroundColor: "#D6DBCF",
          padding:15,
          justifyContent:'center',
          alignItems:'center'
        }}>
          <TouchableOpacity  style={{left:15, position:'absolute'}} onPress={()=>{navigation.goBack()}}>
          <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>
          <Text style={{fontWeight:'600', fontSize:18}}>LIST CUSTOMER</Text>
        </View>
      <ScrollView>
        {listChats.map((item, index) => (
          <Item key={index} id={item.id} chatName={item.name} photoURL={item.photoURL} idRoom={item.id} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
export default Home

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

})