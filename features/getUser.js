import { doc, getDoc } from "firebase/firestore";
import { dbStore } from "../firebase"; // your Firebase configuration file
async function getUser  (idUser) {
  try {
    const docRef = doc(dbStore, "users", idUser);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user document:", error);
    return null;
  }
};

export default getUser;
