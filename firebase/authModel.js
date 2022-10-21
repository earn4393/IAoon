//  เล่นกับ database service

import firebaseApp from "./connect";
import "firebase/auth";
const auth = firebaseApp.auth();

export const signInEmailPass = (
  email = "",
  password = "",
  success,
  unsuccess
) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      success(user.email);
    })
    .catch((err) => {
      console.log("signInEmilPass error");
      unsuccess(err.code + "" + err.message);
    });
};

export const signOut = (success, unsucces) => {
  auth
    .signOut()
    .then(() => {
      success();
    })
    .catch((err) => {
      console.log("signOut error");
      unsuccess(err.code + " " + err.message);
    });
};

export const getCurrentUser = () => {
  return auth.currentUser;
};
