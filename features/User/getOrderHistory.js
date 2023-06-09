import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

export default getOrderHistory = async (state) => {
  const docRef = collection(dbStore, "orders");

  const q = query(docRef,where('idUser',"==",auth.currentUser.uid),where('status','==',state));
  const data= await getDocs(q);
  const finalData= [];
  
  data.forEach((doc) => {
    const orderData = doc.data();
    orderData.id = doc.id;
    finalData.push(orderData);
  });
  
  return finalData;
  
};
