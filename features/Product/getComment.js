import { collection, getDocs, query, where } from "firebase/firestore";
import getUser from "../User/getUser";
import { dbStore } from "../../firebase";

export default getComment = async (idProduct) => {
  const refComment = collection(dbStore, "rating");
  const q = query(refComment, where("idProduct", "==", idProduct));
  const data = await getDocs(q);
  const finalData = [];
  const promises = [];
  data.forEach((doc) => {
    const promise = new Promise(async (resolve) => {
      const commentData = {
        content: doc.data().content,
        star: doc.data().star,
        name: doc.data().name,
      };
      const user = await getUser(doc.data().idUser);
      commentData.avatar = user.image;
      resolve(commentData);
    });
    promises.push(promise);
  });

  const results = await Promise.all(promises);
  results.forEach((commentData) => {
    finalData.push(commentData);
  });
  return finalData;
};
