import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { auth, dbRealTime } from "../../../firebase";
import { set, ref, child, get, serverTimestamp } from "firebase/database";
import { ImageBackground } from "react-native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function Index({navigation,}) {
  const [inputChat, setInputChat] = useState("");
  var [historyMessage, setHistoryMessage] = React.useState([{}]);
  var currentdate = new Date();
  //get message history
  function getMessage() {
    const dbRef = ref(dbRealTime);
    get(child(dbRef, `ChatRoom/${'t0MbXkc480ZZ8ZgsidDTSYcykZg1'}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let a = [];
          snapshot.forEach((childSnapshot) => {
            a.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          setHistoryMessage(a);
        } else {
          setHistoryMessage(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return historyMessage;
  }
  function sendMessage() {
    if (inputChat != "") {
      let timeNow = new Date()
        ;

      let idChat = currentdate.getTime()
      // import module crypto-jshi
      set(ref(dbRealTime, `ChatRoom/${'t0MbXkc480ZZ8ZgsidDTSYcykZg1'}/${idChat}`), {
        idUser: 't0MbXkc480ZZ8ZgsidDTSYcykZg1',
        message: inputChat,
        timeStamp: timeNow,
        photoURL: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
      })
        .then(() => {
          setInputChat('');
          getMessage();
        })
        .catch((error) => {
          alert(error.message);
        });
    } else null;
  }
  useEffect(() => {
     getMessage()
   }, );
  return (
    <SafeAreaView style={{}}>
      <StatusBar barStyle={"dark-content"} />
      {/* header */}
      <View
        style={{
          width: width,
          height: height * 0.1,
          borderBottomWidth: 1.4,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          borderColor: "#BDBDBD",
        }}
      >
        <TouchableOpacity
          onPress={()=>{
               navigation.goBack()
          }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View
          style={{
            width: width * 0.33,
            height: height * 0.08,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 70,
          }}
        >
          <Avatar
            size={60}
            rounded
            source={{
              uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
            }}
          />
          <Text style={{ fontWeight: "700", fontSize: 20 }}>Admin</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: width * 0.2,
          }}
        >
          <TouchableOpacity>
            <Feather name="phone" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="videocam-outline" size={33} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {/* chat */}
      <ImageBackground
      source={require('../../../assets/BackGroundFood.png')}
        style={{
          height: height * 0.765,
          width: width,
          padding:10
        }}
      >
          {historyMessage != null && historyMessage.length > 0 ?                
                      <FlatList
                      data={historyMessage}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => index}
                      // invered 
                      renderItem={({item}) => {
                            return (
                                <View key={item.id} style={[
                              //     item.idUser === auth.currentUser.uid ?
                                     item.idUser === 't0MbXkc480ZZ8ZgsidDTSYcykZg1' ?
                                      styles.sender
                                      :
                                      [styles.reciever]
                                  ]}>
                                  <Text style={[{fontSize:20}]}>{item.message}</Text>
                                  <Text>{item.timeStamp}</Text>
                                  <Avatar
                                    position='absolute'
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={35}
                                    source={{
                                      uri : 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'
                                    }}
                                  />
                                </View>
                              
                            )

                      }}
                  />
                :
                    null
                }
      </ImageBackground>
      <View
        style={{
          height: height * 0.08,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TextInput
          placeholder="Typing message"
          style={{
            backgroundColor: "#CDCDCD",
            width: width * 0.79,
            height: "72%",
            borderRadius: 25,
            paddingLeft: 20,
          }}
          onChangeText={(text) => setInputChat(text)}
          autoCapitalize={"none"}
          value={inputChat}
        />
        {inputChat != "" ? (
          <>
            <TouchableOpacity
               onPress={()=>{
                    sendMessage()
               }}
            >
              <FontAwesome name="send" size={32} color="#5AA60D" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity>
              <Feather name="image" size={32} color="black" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
     container: {
              flex: 1,
              padding:10
     },
     input:{
              height:55,
              width:'85%',
              borderRadius:40,
              backgroundColor:'#E4E4E4',
              padding:18,
              fontSize:20,
     },
     footer:{
              flexDirection:'row',
              height: 80,
              width: '100%',
              padding: 10,
              alignItems:'space-around',
     },
     reciever:{
       padding: 15,
       backgroundColor: "#4E9F6E",
       alignSelf:'flex-start',
       borderRadius:25,
       marginBottom: 15,
       maxWidth:'75%',
       position:'relative',
       marginLeft:10
     },
     sender:{
       padding: 15,
       backgroundColor: "#CBC1C1",
       alignSelf:'flex-end',
       borderRadius:25,
       marginBottom: 15,
       maxWidth:'75%',
       position:'relative',
       marginRight:10
     },
     actionSend:{
            height:50,
            width:'15%',
            justifyContent: 'center',
            alignItems:'center'
     }
      })