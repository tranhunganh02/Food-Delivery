import { FieldValue, deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

export default deleteProduct = async (idProduct) => {
  await deleteDoc(doc(dbStore, "products", idProduct)).then(async () => {
    await updateDoc(doc(dbStore,"favorites",auth.currentUser.uid),{
      [idProduct] : deleteField()
    })
    await updateDoc(doc(dbStore,"carts",auth.currentUser.uid),{
      [idProduct] : deleteField()
    })
    alert("Delete Product successfully");
  });
  
  
};
