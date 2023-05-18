import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";
import ModalLoading from "../../component/User/ModalLoading";
import { Alert } from "react-native";

export default OrderProduct = async ({ data, total ,address,methodPay}) => {
  data.forEach(async ({ idProduct }) => {
    await updateDoc(doc(dbStore, "carts", auth.currentUser.uid), {
      [idProduct]: deleteField(),
    });
  });
  await setDoc(doc(dbStore, "orders", Date.now().toString()), {
    idUser: auth.currentUser.uid,
    status: 0,
    total: total,
    data: data,
    address: address,
    methodPay: methodPay
  })
    .then(() => {
      Alert.alert("", "Order Successful! \nYou can check it here");
    })
    .catch((error) => {
      console.log(error);
    });
};
