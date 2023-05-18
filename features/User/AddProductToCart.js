import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

const AddProductToCart = async (data) => {
  const docRef = doc(dbStore, "carts", auth.currentUser.uid);

  const docSnap = await getDoc(docRef);
  if (docSnap.data()[data["idProduct"]]) {
    await setDoc(
      doc(dbStore, "carts", auth.currentUser.uid),
      {
        [data["idProduct"]]: {
          quantity:
            docSnap.data()[data["idProduct"]]["quantity"] + data["quantity"],
        },
      },
      { merge: true }
    )
    return "Update Success";
  } else {
    const dataPrepare = {
      [data["idProduct"]]: data,
    };
    await setDoc(doc(dbStore, "carts", auth.currentUser.uid), dataPrepare, {
      merge: true,
    })
    return "Add Success"
  }
};

export default AddProductToCart;
