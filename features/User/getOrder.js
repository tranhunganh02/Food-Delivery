import { doc, getDoc } from "firebase/firestore";
import { dbStore } from "../../firebase"

export default getOrder = async(idOrder)=> {
    const data= await getDoc(doc(dbStore,"orders",idOrder));
    return data.data();
}