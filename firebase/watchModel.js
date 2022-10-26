import firebaseApp from "./connect";
import "firebase/firestore";

const DB = firebaseApp.firestore();
const watchCall = DB.collection("watch");

export const getAllWatches = async (success) => {
  const snapshot = await watchCall.get();
  if (snapshot.empty) {
    return;
  }
  snapshot.forEach((doc) => {
    success(doc);
  });
};
