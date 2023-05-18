import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { auth, dbStore } from "../../firebase"

export default ratingEachProduct = async ({data,content,star,idOrder,name}) => 
{
   await setDoc(doc(dbStore,"orders",idOrder),{
    isRated : true,
    content: content,
    star: star,
   },{merge: true});
    data.forEach(async (idProduct)=> 
    {
        await addDoc(collection(dbStore,"rating"),{
            idProduct:idProduct,
            star:star,
            content: content,
            idUser: auth.currentUser.uid,
            name: name
        })
        .then(()=>
        {
            console.log("done"+ idProduct);
        })
    })
}