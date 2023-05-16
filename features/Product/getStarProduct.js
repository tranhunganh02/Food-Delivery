import { collection,  getDocs, query, where } from "firebase/firestore"
import { dbStore } from "../../firebase"

export default getStarProduct =async(idProduct) => 
{
    const refProduct= collection(dbStore,"rating");
    const q = query(refProduct,where("idProduct","==",idProduct));
    const data = await getDocs(q);
    if(data.length == 0)
    {
        return 0;
    }
    let count=0;
    let result=0;
    data.forEach((rating)=> {
        count+=1;
        result+=rating.data().star;
    })
    return result/count;
} 