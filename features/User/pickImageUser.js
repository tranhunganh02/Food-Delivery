import { useState } from "react";
import { useEffect } from "react";
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

import { dbStore, storage } from "../../firebase";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
const ButtonPickImage = ({ idUser }) => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Couldn't"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "Avatar/" + idUser);
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            const userRef = doc(dbStore, "users", idUser);
            await updateDoc(userRef, {
              image: downloadURL,
            }).then(() => {
              alert('Avatar changed successfully');
            });
          });
        }
      );
    };
    if (image != null) {
      uploadImage();
      setImage(null);
    }
  });
  return (
    <TouchableOpacity onPress={pickImage} style={styles.headerButton}>
      <FontAwesome name="exchange" size={24} color="#E8E8E8" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: "#26295F",
    position: "absolute",
    top: 115,
    borderRadius: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
  },
});
export default ButtonPickImage;
