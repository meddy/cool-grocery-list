import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

interface SignUpProps {
  isAuthenticated: boolean;
}

function SignUp(props: SignUpProps) {
  console.log("test");
  const { isAuthenticated } = props;

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

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
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return null;
}

export default SignUp;
