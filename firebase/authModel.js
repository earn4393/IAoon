//  เล่นกับ database service

import firebaseApp from "./connect";
import "firebase/firestore";
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

export const signUpEmailPass = (
  email = "",
  password = "",
  success,
  unsuccess
) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      success(user);
    })
    .catch((err) => {
      let errMsg = err.code + err.message;
      console.log(errMsg);
      unsuccess(errMsg);
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

export const recoverPassword = (email, success, unsuccess) => {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("New password has been send to ", email);
      success("New password has been send to " + email);
    })
    .catch((err) => {
      console.log("Cannot send password reser email");
      unsuccess(err.code + " " + err.message);
    });
};
