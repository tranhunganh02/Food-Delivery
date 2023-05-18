import { deleteDoc, doc } from "firebase/firestore"
import { dbStore } from "../../firebase"

export default orderCancel = async( idOrder) =>
{
    await deleteDoc(doc(dbStore, "orders", idOrder)).then(()=>
    {
        alert("Order deleted successfully");
    })
}