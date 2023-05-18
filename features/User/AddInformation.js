import { doc, setDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";
import { Alert } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { Modal } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { updatePassword } from "firebase/auth";
import getUser from "./getUser";
import ModalLoading from "../../component/User/ModalLoading";

export default AddInformation = async (data) => {
  if (data.password) {
    updatePassword(auth.currentUser, data.password);
  }
  await setDoc(
    doc(dbStore, "users", auth.currentUser.uid),
    {
      name: data.name,
      birthday: data.birthday,
      gender: data.gender,
    },
    { merge: true }
  );

  const result = await getUser(auth.currentUser.uid);
  return result;
 
};
