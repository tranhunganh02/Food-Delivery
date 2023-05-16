import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, dbStore } from "../../firebase";
import getProduct from "../Product/getProduct"; 
export default getProductWithNameDoc = async (nameDoc) => {
  const docRef = doc(dbStore, nameDoc, auth.currentUser.uid);

  const docSnap = await getDoc(docRef);
  const data = Object.entries(docSnap.data()).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const productIds = Object.values(data).map((item) =>
    nameDoc == "carts" ? item.idProduct : item.id
  );
  console.log(productIds);
  const propertiesToAdd = ["name", "price", "image"];
  const products = await Promise.all(
    productIds.map((productId) => getProduct(productId))
  );
  if (nameDoc == "carts") {
    const result = Object.values(data).map((item, index) => {
      propertiesToAdd.forEach((property) => {
        item[property] = products[index][property];
      });
      return item;
    });
    return result;
  }

  return products;
};
