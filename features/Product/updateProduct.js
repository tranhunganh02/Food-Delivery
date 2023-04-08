import {doc, updateDoc } from "firebase/firestore";
import { dbStore } from "../../firebase";

const updateProduct =async(data) =>{
    await updateDoc(doc(dbStore,"products",data.id),data).then(
        ()=> {alert("Update Product Success!");},
    )
}
export default updateProduct;
