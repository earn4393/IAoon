import firebaseApp from "./connect";
import "firebase/firestore";

const DB = firebaseApp.firestore();
const userCall = DB.collection("user");

export const getUserByUsername = (email, success, unsucces) => {
  console.log("2222222");
  userCall
    .where("email", "==", email)
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

export const addUser = (profile, success) => {
  const docRef = userCall
    .add(profile)
    .then(() => {
      success(profile);
    })
    .catch((err) => {
      console.error(`Cannot insert profile due to ${err}`);
    });
};
