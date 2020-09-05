import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import React from "react";
import ReactDOM from "react-dom";

import "firebase/auth";
import "firebaseui/dist/firebaseui.css";

import App from "./App";
import firebaseConfig from "./firebase.config.json";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp(firebaseConfig);

// firebase.auth().signOut();

const authUI = new firebaseui.auth.AuthUI(firebase.auth());
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
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
  }
  console.log(user);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
