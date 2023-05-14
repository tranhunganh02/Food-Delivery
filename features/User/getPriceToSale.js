import { doc, getDoc } from "firebase/firestore";
import { dbStore } from "../../firebase";

export default getPriceToSale = async (discount) => {
  const docRef = doc(dbStore, "discount", discount);
  const docSnap = await getDoc(docRef);
  return docSnap.data() ? docSnap.data().price : null;
};
