import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { dbStore } from "../../firebase";
const fetchProduct = async () => {
  const q = query(collection(dbStore, "products"));

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) =>
  {
    return {
        id: doc.id,
        data: doc.data(),
      };
  }
  )
  return data;
};
export default fetchProduct;
