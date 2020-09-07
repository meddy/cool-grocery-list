import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import { useEffect } from "react";

export default function SignUp() {
  console.log("test");
  useEffect(() => {
    const authUI = new firebaseui.auth.AuthUI(firebase.auth());
    authUI.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function () {
          return false;
        },
      },
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    });
  }, []);

  return null;
}
