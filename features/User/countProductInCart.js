import { collection, getDocs } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

export default async function countProduct() {
  const querySnapshot = await getDocs(collection(dbStore, "carts"));
  let count = 0;
  querySnapshot.forEach((docSnapshot) => {
    if (docSnapshot.id === auth.currentUser.uid) {
      count = Object.keys(docSnapshot.data()).length;
    }
  });
  return count;
}