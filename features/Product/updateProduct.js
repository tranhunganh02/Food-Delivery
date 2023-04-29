import {doc, updateDoc } from "firebase/firestore";
import { dbStore } from "../../firebase";

const updateProduct =async({data,navigation}) =>{
    await updateDoc(doc(dbStore,"products",data.id),data).then(
        ()=> {navigation.navigate("Profile")},
    )
}
export default updateProduct;
