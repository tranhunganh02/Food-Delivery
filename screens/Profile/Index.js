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
import React from "react";
import {
  FontAwesome,
  SimpleLineIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
const height = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.headerContainer}>
        <Avatar
          size={125}
          rounded
          source={{
            uri: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
          }}
        />
        <TouchableOpacity style={styles.headerButton}>
          <FontAwesome name="exchange" size={24} color="#E8E8E8" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mohamed Lanh Buồi</Text>
        <Text style={{ bottom: 10 }}>0905113115116</Text>
      </View>
      <View
        style={{
          height: height * 0.4,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.ActionButton}>
          <AntDesign name="profile" size={27} color="black" />
          <Text style={styles.actionText}>Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ActionButton}>
          <FontAwesome name="address-book-o" size={27} color="black" />
          <Text style={styles.actionText}>Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ActionButton}>
          <Ionicons name="chatbox-ellipses-outline" size={27} color="black" />
          <Text style={styles.actionText}>Contact admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ActionButton}>
          <SimpleLineIcons name="logout" size={27} color="black" />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
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
    height: height * 0.058,
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
