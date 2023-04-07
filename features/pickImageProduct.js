import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import { dbStore, storage } from "../firebase";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useEffect } from "react";
import { useState } from "react";

const PickImageProduct = async () => {
    let image;
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
       image = result.assets[0].uri;
    }
    return image;
  };
  
  

//   return (
//     "123"
//   );

const styles = StyleSheet.create({
 
});
export default PickImageProduct;
