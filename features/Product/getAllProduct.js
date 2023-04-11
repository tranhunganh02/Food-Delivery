import {
    collection,
    getDocs,
    query,
  } from "firebase/firestore";
  import { useState } from "react";
  import { dbStore } from "../../firebase";
  const getAllProduct = async () => {
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
  export default getAllProduct;
  