import firebaseApp from "./connect";
import "firebase/firestore";

const DB = firebaseApp.firestore();
const watchCall = DB.collection("watch");

export const getAllWatches = async (success1, success2) => {
  const snapshot = await watchCall.get();
  if (snapshot.empty) {
    return;
  }
  snapshot.forEach((doc) => {
    success1(doc);
    success2(doc);
  });
};

export const updateWatch = async (watch) => {
  console.log("11111111111111111111111111");
  console.log(watch.love);
  const doc = await watchCall.doc(watch.id).set(watch);
};
