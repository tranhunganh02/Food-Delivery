import { collection, getDocs, query, where } from "firebase/firestore";
import { dbStore } from "../../firebase";

export default getListUser = async(role) =>
{
    const refDeliver = collection(dbStore, "users");
    const q = query(refDeliver, where("role", "==", role));
    const data = await getDocs(q);
    const finalData=[];
    data.forEach((doc) =>
    {
        const userData = doc.data();
        userData.id = doc.id;
        finalData.push(userData);
    })
    return finalData;
}