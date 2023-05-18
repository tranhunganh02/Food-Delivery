import { deleteField, doc, updateDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

export default deleteProductInCart =async (data) =>
{
    const ref = doc(dbStore, 'carts', auth.currentUser.uid);
     data.forEach(async (product)  =>
     {
        await updateDoc(
            ref,
            {
                [product.idProduct]: deleteField()
            }
        ).then(()=>console.log("done"+ product.idProduct))
     })
}