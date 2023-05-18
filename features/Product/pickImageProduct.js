import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { StyleSheet } from "react-native";

const PickImageProduct = async () => {
    let image;
    let result = await  launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
       image = result.assets[0].uri;
    }
    return image;
  };
export default PickImageProduct;
