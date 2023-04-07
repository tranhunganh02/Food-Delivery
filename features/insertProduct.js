import { addDoc, collection, doc } from "@firebase/firestore";
import { dbStore } from "../firebase";

const insertProduct = async(data) => {
   
    await addDoc(collection(dbStore,"products"),data).then(
        ()=> {alert("Add Product Success!");},
    )
}
export default insertProduct;