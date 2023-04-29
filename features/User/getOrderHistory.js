import { doc, getDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

export default getOrderHistory = async () => {
  const docRef = doc(dbStore, "orders", auth.currentUser.uid);

  const docSnap = await getDoc(docRef);

  const data = Object.entries(docSnap.data()).map(([key, value]) => ({
    id: key,
    ...value,
  }));
  return data;
};
