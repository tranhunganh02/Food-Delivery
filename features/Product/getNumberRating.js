import { collection, getCountFromServer, query, where } from "firebase/firestore"
import { dbStore } from "../../firebase"

export default getNumberRating = async(idProduct ) =>
{
    const ref = collection(dbStore,"rating");
    const q = query(ref,where("idProduct","==",idProduct));
    const data =await getCountFromServer(q);
    return data.data().count;
}