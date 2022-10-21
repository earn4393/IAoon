import firebaseApp from "./connect";
import "firebase/auth";

const DB = firebaseApp.firestore();
const userCall = DB.collection("user");

export const getUserByUsername = (username, success, unsucces) => {
  console.log("2222222");
  userCall
    .where("username", "==", username)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        success(doc);
      });
    })
    .catch((err) => {
      unsucces(err);
    });
};
