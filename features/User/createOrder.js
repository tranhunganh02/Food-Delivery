import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";
import ModalLoading from "../../component/User/ModalLoading";
import { Alert } from "react-native";

export default OrderProduct = async ({data,total}) => {
  data.forEach(async ({ idProduct }) => {
    await updateDoc(doc(dbStore, "carts", auth.currentUser.uid), {
      [idProduct]: deleteField(),
    });
  });
  await setDoc(
    doc(dbStore, "orders", auth.currentUser.uid),
    {
      [Date.now()]: {
        isDelivery: false,
        total: total,
        data: data,
      },
    },
    { merge: true }
  ).then(() =>{
    Alert.alert("","Order Successful! \nYou can check it here")
  });
  
};
