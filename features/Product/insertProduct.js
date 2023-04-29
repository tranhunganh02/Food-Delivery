import { addDoc, collection, doc } from "@firebase/firestore";
import { dbStore } from "../../firebase";

const insertProduct = async({data,navigation}) => {
   
    await addDoc(collection(dbStore,"products"),data).then(
        ()=> {navigation.navigate("Profile")},
    )
}
export default insertProduct;