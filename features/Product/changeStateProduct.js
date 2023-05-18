import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";
const updateQuantity =async(data) => {
  const docRef = doc(dbStore, "carts", auth.currentUser.uid);

  const docSnap = await getDoc(docRef);
  if (docSnap.data()[data["idProduct"]]) {
    await setDoc(
      doc(dbStore, "carts", auth.currentUser.uid),
      {
        [data["idProduct"]]: {
          quantity: data["quantity"],
        },
      },
      { merge: true }
    );
  }
}
export default changeStateProduct=async (data) => {
    for(let i=0;i<data.length;i++) {
      await  updateQuantity(data[i]);
    }

    
}