import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, dbStore } from "../../firebase"

export default getAllOrder = async()=> {
    const ref= collection(dbStore,"orders");
    const q= query(ref,where("idUser","==",auth.currentUser.uid),where("status","in",[0,1,2]))
    const data= await getDocs(q)
    const finalData=[];
    data.forEach((item) =>
    {
        const orderData = item.data();
        orderData.id= item.id;
        finalData.push(orderData);
    })
    return finalData;
}