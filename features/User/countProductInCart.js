import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

export default async function countProduct() {
  const docRef = doc(dbStore, "carts", "Y60Qcsh3ftZWTZhmnhQTOVxWXFJ2");

  const docSnap = await getDoc(docRef);
  const data = Object.entries(docSnap.data()).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const productIds = Object.values(data).map((item) => item.idProduct);
  return productIds.length;
}
