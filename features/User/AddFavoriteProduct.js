import { doc, setDoc } from "firebase/firestore";
import { auth, dbStore } from "../../firebase";

export default AddFavoriteProduct = async (id) => {
  await setDoc(doc(dbStore, "favorites", auth.currentUser.uid), {[id]: id}, {
    merge: true,
  });
};
