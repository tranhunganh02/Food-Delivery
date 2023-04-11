import {
    collection,
    getDocs,
    query,
  } from "firebase/firestore";
  import { useState } from "react";
  import { dbStore } from "../../firebase";
  const getProductInCart = async () => {
    const q = query(collection(dbStore, "carts"));
    const querySnapshot = await getDocs(q);
    
    const data = querySnapshot.docs.map((doc,index) =>
    {
      return  doc.data();
    }
    )
    return Object.values(data[0])
  };
  export default getProductInCart;
  