import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Avatar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  FontAwesome,
  SimpleLineIcons,
  AntDesign,
  Ionicons,
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
  const [userData, setUserData] = useState({});
  const { user } = useContext(AppContext);
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
          <ButtonPickImage idUser={auth.currentUser.uid} />
        ) : (
          <Text></Text>
        )}
        {user ? (
          <View>
            <Text style={styles.headerText}>{user.name}</Text>
            <Text style={{ bottom: 10 }}>{user.phoneNumber}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.headerText}>No name</Text>
            <Text style={{ bottom: 10 }}>0905113115116</Text>
          </View>
        )}
      </View>
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
        <TouchableOpacity
          style={styles.ActionButton}
          onPress={() => {
            if (user) {
              navigation.navigate("Address");
            } else {
              navigation.navigate("SignIn");
            }
          }}
        >
          <FontAwesome name="address-book-o" size={27} color="black" />
          <Text style={styles.actionText}>Address</Text>
        </TouchableOpacity>
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
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 0.26,
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
});
