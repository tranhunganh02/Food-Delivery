import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { dbStore } from "../../firebase";
const fetchProduct = async ({category,limitProduct}) => {
  const q = query(collection(dbStore, "products"),
  category? where("selectedCategory", "==", category) : null,
  limitProduct ? orderBy("created_at","desc") : null,
  limitProduct? limit(limitProduct):null);
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
