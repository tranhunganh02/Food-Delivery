import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";
import getProduct from "../Product/getProduct";
import { createContext } from "react";

const getProductInCart = async () => {
  const q = query(collection(dbStore, "carts"), auth.currentUser.uid);
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data())[0];
  const productIds = Object.values(data).map((item) => item.idProduct);

  const propertiesToAdd = ["name", "price", "image"];
  const products = await Promise.all(
    productIds.map((productId) => getProduct(productId))
  );

  const result = Object.values(data).map((item, index) => {
    propertiesToAdd.forEach((property) => {
      item[property] = products[index][property];
    });
    return item;
  });
  return result;
};

export default getProductInCart;
