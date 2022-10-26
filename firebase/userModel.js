import firebaseApp from "./connect";
import "firebase/firestore";

const DB = firebaseApp.firestore();
const userCall = DB.collection("watch");
