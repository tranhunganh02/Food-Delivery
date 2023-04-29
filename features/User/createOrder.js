import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

export default OrderProduct = async (data) => {
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
        data: data,
      },
    },
    { merge: true }
  ).then(() => alert("order successful"));
};
