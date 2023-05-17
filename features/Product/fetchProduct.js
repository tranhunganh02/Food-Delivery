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
import getNumberRating from "./getNumberRating";
const fetchProduct = async ({category,limitProduct}) => {
  const q = query(collection(dbStore, "products"),
  category? where("selectedCategory", "==", category) : null,
  limitProduct ? orderBy("created_at","desc") : null,
  limitProduct? limit(limitProduct):null);
  const data = await getDocs(q);
  const finalData = [];
  const promises = [];
  data.forEach((doc) => {
    const promise = new Promise(async (resolve) => {
      const productData = {
        id: doc.id,
        data: doc.data()
      };
      const number= await getNumberRating(doc.id);
      productData.number = number;
      const star = await getStarProduct(doc.id);
      productData.star = star ? star : 0;
      resolve(productData);
    });
    promises.push(promise);
  });

  const results = await Promise.all(promises);
  results.forEach((product) => {
    finalData.push(product);
  });
  return finalData;
};
export default fetchProduct;
