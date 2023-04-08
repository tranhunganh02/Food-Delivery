import { doc, getDoc } from "firebase/firestore";
import { dbStore } from "../../firebase";
const getProduct = async (idProduct) => {
  const docRef = doc(dbStore, "products", idProduct);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
export default getProduct;
