import { doc, updateDoc } from "firebase/firestore"
import { dbStore } from "../../firebase"

export default changeRole = async ({idUser,role}) =>
{
    updateDoc(doc(dbStore,"users",idUser),{
        role : role
    });
}