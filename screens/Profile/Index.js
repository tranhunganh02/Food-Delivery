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
  MaterialIcons
} from "@expo/vector-icons";
const height = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Index({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        <Text style={styles.headerText}>Mohamed Lanh </Text>
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
              navigation.navigate("Information");
            }}
          >
            <AntDesign name="profile" size={27} color="black" />
            <Text style={styles.actionText}>Information</Text>
          </TouchableOpacity>
          {global.users.role == 1 ? (
            <>
              <TouchableOpacity
                style={styles.ActionButton}
                onPress={() => {
                  navigation.navigate("Support");
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
                  navigation.navigate("ListFood");
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
                  navigation.navigate("Address");
                }}
              >
                <FontAwesome name="address-book-o" size={30} color="black" />
                <Text style={styles.actionText}>Address</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ActionButton}
                onPress={() => {
                  navigation.navigate("Chat");
                }}
              >
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={30}
                  color="black"
                />
                <Text style={styles.actionText}>Contact admin</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ActionButton}
                onPress={() => {
                  navigation.navigate('Order')
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
          <TouchableOpacity
            style={styles.ActionButton}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <SimpleLineIcons name="logout" size={28} color="black" />
            <Text style={styles.actionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent:'center',
    alignItems:'center'
  },
});
