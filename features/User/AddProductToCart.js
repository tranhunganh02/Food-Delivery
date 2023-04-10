import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

const AddProductToCart = async (data) => {
    
    const dataPrepare = {
    [Date.now()]: {
            data
        }
    }
    await setDoc(doc(dbStore, "carts", auth.currentUser.uid),dataPrepare,{merge:true}).then(() => {
      alert("Add Product To Cart Success!");
    });
  

}

export default AddProductToCart;
