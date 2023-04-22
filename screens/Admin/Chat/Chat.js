import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import React, { useState, useEffect,  } from "react";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { auth, dbRealTime } from "../../../firebase";
import { set, ref, child, get, serverTimestamp } from "firebase/database";
import { ImageBackground } from "react-native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function ChatCustomer({ navigation, route }) {
  const [inputChat, setInputChat] = useState("");
  var [historyMessage, setHistoryMessage] = React.useState([{}]);
  var currentdate = new Date();
  const [initialScrollIndex, setInitialScrollIndex] = useState(0);
  //get message history
  function getMessage() {
    const dbRef = ref(dbRealTime);
    get(child(dbRef, `ChatRoom/${route.params.idRoom}`))
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
      let timeNow = new Date();
      let idChat = currentdate.getTime();
      // import module crypto-jshi
      set(ref(dbRealTime, `ChatRoom/${route.params.idRoom}/${idChat}`), {
        idUser: "7RD1aJUZ7KSANTVmEtlrTQzKyup2",
        message: inputChat,
        timeStamp: timeNow,
        photoURL: "",
      })
        .then(() => {
          setInputChat("");
          getMessage();
        })
        .catch((error) => {
          alert(error.message);
        });
    } else null;
  }
  useEffect(() => {
    getMessage();
  },[historyMessage]);
  return (
    <SafeAreaView style={{backgroundColor:'#fff'}}>
      <StatusBar barStyle={"dark-content"} />
      {/* header */}
      <View
        style={{
          width: width,
          height: height * 0.1,
          borderBottomWidth: 0.5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          borderColor: "#BDBDBD",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View
          style={{
            width: width * 0.36,
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
              uri: route.photoURL,
            }}
          />
          <Text style={{ fontWeight: "600", fontSize: 19 }}>
            {route.params.chatName}
          </Text>
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
      <View
        style={{
          height: height * 0.765,
          width: width,
          padding: 10,
          backgroundColor:'#'
        }}
      >
        {historyMessage != null && historyMessage.length > 0 ? (
          <FlatList
            data={historyMessage}
            showsVerticalScrollIndicator={true}
            
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <>
                  {item.idUser === route.params.id ? (
                    <>
                      <View key={item.id} style={styles.reciever}>
                        <Text style={[{ fontSize: 20 }]}>{item.message}</Text>
                        <Text>{item.timeStamp}</Text>
                          <Avatar
                             position="absolute"
                             rounded
                             bottom={-15}
                             left={-5}
                             size={35}
                            source={route.params.photoURL? {uri:route.params.photoURL} : require('../../../assets/avatar/avatarNull.png')}
                          />
                      </View>
                    </>
                  ) : 
                    <>
                     <View key={item.id} style={styles.sender}>
                        <Text style={[{ fontSize: 20 }]}>{item.message}</Text>
                        <Text>{item.timeStamp}</Text>
                          <Avatar
                             position='absolute'
                             rounded
                             bottom={-15}
                             right={-5}
                             size={40}
                             source={route.params.photoURL? {uri:route.params.photoURL} : require('../../../assets/avatar/admin.jpeg')}
                          />
                      </View>
                    </>
                  }
                </>
              );
            }}
          />
        ) : null}
      </View>
      <KeyboardAvoidingView
         behavior={Platform.OS === "android" ? "height" : 300}
         keyboardVerticalOffset={Platform.OS === "android" ? 100 : 0}
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
            width: width * 0.78,
            height: "72%",
            borderRadius: 25,
            paddingHorizontal: 15,
          }}
          onChangeText={(text) => setInputChat(text)}
          autoCapitalize={"none"}
          value={inputChat}
        />
        {inputChat != "" ? (
          <>
            <TouchableOpacity
              onPress={() => {
                sendMessage();
              }}
            >
              <FontAwesome name="send" size={33} color="#5AA60D" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity>
              <Feather name="image" size={39} color="#5D9C59" />
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 55,
    width: "85%",
    borderRadius: 40,
    backgroundColor: "#E4E4E4",
    padding: 18,
    fontSize: 20,
  },
  footer: {
    flexDirection: "row",
    height: 80,
    width: "100%",
    padding: 10,
    alignItems: "space-around",
  },
  reciever: {
    padding: 15,
    backgroundColor: "#9DC08B",
    alignSelf: "flex-start",
    borderRadius: 25,
    marginBottom: 15,
    maxWidth: "75%",
    position: "relative",
    marginLeft: 10,
  },
  sender: {
    padding: 15,
    backgroundColor: "#A9907E",
    alignSelf: "flex-end",
    borderRadius: 25,
    marginBottom: 15,
    maxWidth: "75%",
    position: "relative",
    marginRight: 10,
  },
  actionSend: {
    height: 50,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});
