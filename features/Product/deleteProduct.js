import { dbStore } from "../../firebase";

export default deleteProduct = async (idProduct) => {
  await deleteDoc(doc(dbStore, "products", idProduct)).then(() => {
    alert("Delete Product successfully");
  });
  // firebase.firestore().collection('carts').where('idProduct', '==', idProduct).get()
};
