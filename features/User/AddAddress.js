import { doc, setDoc } from "firebase/firestore"
import { auth, dbStore } from "../../firebase"

export default AddAddress =async (data) =>{
   await setDoc(doc(dbStore,"users",auth.currentUser.uid),{
        city: data.city,
        district: data.district,
        ward : data.ward ,
        specificAddress :   data.specificAddress,
        phoneNumber : data.phoneNumber
    },{merge: true}).then(()=>{
        alert("Add address successfully")
    })
}