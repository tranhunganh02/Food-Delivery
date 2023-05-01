import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";

import { Avatar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  FontAwesome,
  SimpleLineIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ButtonPickImage from "../../features/User/pickImageUser";
import { auth, storage } from "../../firebase";
import getUser from "../../features/User/getUser";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AppContext } from "../../component/Auth/AuthContext";
const height = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function Index({ navigation }) {
  const { user } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.headerContainer}>
        {user ? (
          <Avatar
            size={125}
            rounded
            source={{
              uri: user.image
                ? user.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3R_8hlZCdl3FOthlfWXOOLlf3Ngqp6sQvtXQhSs&s",
            }}
          />
        ) : (
          <Avatar
            size={125}
            rounded
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3R_8hlZCdl3FOthlfWXOOLlf3Ngqp6sQvtXQhSs&s",
            }}
          />
        )}
        {user ? (
          <>
            <ButtonPickImage idUser={auth.currentUser.uid} />
            <Text style={styles.headerText}>{user.name} </Text>
          </>
        ) : (
          <Text style={styles.headerText}>No name</Text>
        )}
      </View>
      <ScrollView>
        <View
          style={{
            height: height * 0.5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.ActionButton}
            onPress={() => {
              if (user) {
                navigation.navigate("Information");
              } else {
                navigation.navigate("SignIn");
              }
            }}
          >
            <AntDesign name="profile" size={27} color="black" />
            <Text style={styles.actionText}>Information</Text>
          </TouchableOpacity>
          {global.users.role === 1 ? (
            <>
              <TouchableOpacity
                style={styles.ActionButton}
                onPress={() => {
                  if (user) {
                    navigation.navigate("Support");
                  } else {
                    navigation.navigate("SignIn");
                  }
                }}
              >
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={27}
                  color="black"
                />
                <Text style={styles.actionText}>Support</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ActionButton}
                onPress={() => {
                  if (user) {
                    navigation.navigate("ListFood");
                  } else {
                    navigation.navigate("SignIn");
                  }
                }}
              >
                <Ionicons name="fast-food-outline" size={27} color="black" />
                <Text style={styles.actionText}>List Food</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.ActionButton}
                onPress={() => {
                  if (user) {
                    navigation.navigate("Chat");
                  } else {
                    navigation.navigate("SignIn");
                  }
                }}
              >
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={27}
                  color="black"
                />
                <Text style={styles.actionText}>Contact admin</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.ActionButton}
                onPress={() => {
                  if(user)
                  {
                    navigation.navigate('Order')
                  }
                  else{
                    navigation.navigate("SignIn")
                  }
                  
                }}
              >
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={30}
                  color="black"
                />
                <Text style={styles.actionText}>Order</Text>
              </TouchableOpacity>
            </>
          )}
          {user ? (
            <TouchableOpacity
              style={styles.ActionButton}
              onPress={() => {
                signOut(auth).then(() => {
                  alert("You have been signed out");
                  navigation.navigate("BottomTab");
                });
              }}
            >
              <SimpleLineIcons name="logout" size={27} color="black" />
              <Text style={styles.actionText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.ActionButton}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <SimpleLineIcons name="login" size={27} color="black" />
              <Text style={styles.actionText}>SignIn</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalViewButton}>
              <TouchableOpacity style={styles.modalViewButtonText}
              onPress={()=> {
                if(!user) 
                {
                  setIsModalVisible(!isModalVisible)
                  navigation.navigate("SignIn")
                }
                else
                {
                  setIsModalVisible(!isModalVisible)
                  navigation.navigate("Order")
                }
              }}>
                <MaterialIcons name="history" size={48} color="black" />
                <Text>Order history</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalViewButtonText}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={50}
                  color="black"
                />
                <Text>To ship</Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(!isModalVisible);
                }}
              >
                <MaterialIcons name="cancel" size={45} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 0.24,
    width: "60%",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
  },
  headerButton: {
    backgroundColor: "#26295F",
    position: "absolute",
    top: 115,
    borderRadius: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  headerText: {
    fontWeight: "900",
    fontSize: 20,
    marginTop: 20,
  },
  ActionButton: {
    height: height * 0.065,
    marginBottom: 23,
    width: windowWidth * 0.8,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderColor: "#A2A2A2",
  },
  actionText: {
    marginLeft: 30,
    top: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-around",
    alignItems: "center",
    width: windowWidth * 0.62,
  },
  modalViewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth * 0.45,
    marginBottom: 30,
  },
  modalViewButtonText: {
    justifyContent: "center",
    alignItems: "center",
  },
});
